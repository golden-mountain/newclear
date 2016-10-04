import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, Col, HelpBlock } from 'react-bootstrap';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'redux-form/immutable'; // imported Field
import { fromJS } from 'immutable';
// import { isEqual } from 'lodash';

// import * as logger from 'helpers/logger';
import createValidationFuncs from 'helpers/validations';

class A10FieldLayout extends Component {
  render() {
    const { label, layout, meta: { touched, error }, children } = this.props;
    let status = {}, errorMsg = '';

    if (touched && error) {
      errorMsg = <HelpBlock className="error">{error}</HelpBlock>;
      status.validationState = 'error';
    }

    return (
      layout === undefined || layout ?
      <FormGroup {...status}>
        <Col componentClass={ControlLabel} sm={2}>{label}</Col>
        <Col sm={10}>
          {children}
          <FormControl.Feedback />
          { errorMsg }
        </Col>
      </FormGroup>
      :
      <FormGroup bsClass="no-layout" {...status}>
        {children}
        <FormControl.Feedback />
        { errorMsg }      
      </FormGroup>
    );
  }  
}

// multiple options input
const registeredMVInputs = [ 'Checkbox', 'Radio' ];

export class A10Field extends Component {

  render() {
    const { children, input, ...fieldOptions } = this.props;
    const newChild = React.Children.map(children, (child) => {
      let inputOptions = {

      };

      const { value, ...restInput } = input;
      // only support React Bootstrap
      // to set value and checked for inputs
      if (~registeredMVInputs.indexOf(child.type.name)) {
        inputOptions['checked'] = child.props.value === value;
      } else {
        inputOptions['value'] = value;
      }

      return  React.cloneElement(child, { ...inputOptions, ...restInput });
    });
    // console.log('new child', newChild);
    return (
      <A10FieldLayout {...fieldOptions}> { newChild } </A10FieldLayout> 
    );
  }
}


// export const A10Field = connect(
//   (state, ownProps) => {
//     logger.debug('debug field props', ownProps);
//     return {
//       fieldObj: state.getIn([ 'form' ])
//     };
//   }
// )(AXField);


class SchemaField extends Component {
  // context defined at page
  constructor(props, context) {
    super(props, context);
    if (!context.props) {
      throw new Error('Config should passed from parent');
    }
    
    this._context = context;
    this._parentProps = this._context.props;
    // this._parentForm = this.props.pageForm.getIn([ context.props.env.form ]);    
  }

  // componentWillReceiveProps(nextProps) {
  //   // const fieldName = this.props.schema['src-name'];
  //   const currentFormValues = this.props.pageForm.getIn([ this._parentProps.env.form, 'values' ] );
  //   const nextFormValues = nextProps.pageForm.getIn([ this._parentProps.env.form, 'values' ]);
  //   if (!currentFormValues || !isEqual(currentFormValues, nextFormValues)) {
  //     const errors = this.validate();
  //     this._parentProps.updateReduxFormSyncErrors(this._parentProps.env.form, errors, {} );    
  //   }
  // }

  componentWillMount() {
    // if (this.props.schema) {
    const { schema, value, name } = this.props;  
    let { validation, conditional } = this.props;
    // register initialValues
    let defaultValue = value !== undefined ? value : (schema ? schema.default : null);
    let values = this.props.pageForm.getIn([ this._parentProps.env.form, 'values' ]);    
    values = values.setIn(name.split('.'), defaultValue);    
    this._parentProps.initialize(values.toJS());

    if (!validation && schema) {
      validation = this.parseValidation(schema);
    }

    if (!conditional && schema) {
      conditional = this.parseSchemaConditional(name, schema);
    }

    const fieldOptions = {
      validations: validation,
      conditionals: this.parseConditional(conditional, defaultValue)
    };
    this._parentProps.registerPageField(name, fromJS(fieldOptions));     
    // }
  }

  // validate() {
  //   let result = Map({});
  //   const pageValidators = this.props.app.getIn([ this._parentProps.env.page, 'form', this.props.name ]);
  //   console.log(this.props.pageForm.toJS(), this.props.name);
  //   const elementValue = this.props.pageForm.getIn([ this._parentProps.env.form, 'values' ].concat(this.props.name.split('.')));
  //   if (pageValidators.validations) {
  //     Object.entries(pageValidators.validations).forEach(([ name, func ]) => {
  //       const msg = func(elementValue, name);
  //       if (msg) {
  //         result = result.setIn(this.props.name.split('.'), msg);
  //         return msg;
  //       }
  //     });
  //   }
  //   return result.toJS();
  // }

  parseValidation(schema) {
    let validations = {};
    const validationFuncs = createValidationFuncs(schema);
    Object.keys(schema).forEach((key) => {
      if (validationFuncs[key] !== undefined ) {
        validations[key] = validationFuncs[key];
      } else if (key === 'format' && validationFuncs[schema[key]] !== undefined) {
        validations[schema[key]] = validationFuncs[schema[key]];
      }
    });
    return validations;
  }

  parseConditional(conditional, cachedValue) {
    let result = { dependOn: undefined, dependValue: false, visible:true, cachedValue };
    if (typeof conditional === 'string') {
      // only a key with not empty value
      result = { dependOn: conditional, dependValue: (dependValue) => !!dependValue, visible:true, cachedValue };
    } else {
      if (conditional && typeof conditional == 'object') {
        if (!conditional.dependOn) {
          // key:value pair
          const firstEntryKey = Object.keys(conditional)[0];
          result = { dependOn: firstEntryKey, dependValue: conditional[firstEntryKey], visible: true, cachedValue };
        } else {
          result = conditional;
        }
      }
    }

    return result;
  }

  parseSchemaConditional(name, schema) {
    let result = {};

    if (schema && schema['condition']) {
      const prefixs = name.split('.');
      prefixs.pop();
      let prefix = prefixs.join('.');
      result[[ prefix, schema['condition'] ].join('.')] = true;
    }
    return result;
  }

  createElement(schema) {
    let type = schema && schema.type ? schema.type : 'string';
    const elementsMap = {
      'string': {
        'component': FormControl,
        'type': 'text',
        'className': 'form-control'
      },
      'number': {
        'component': FormControl,
        'type': 'number',
        'className': 'form-control'       
      }
    };
    const element = elementsMap[type] || elementsMap['string'];
    const { component, ...props } = element;
    return React.createElement(component, props);
  }

  render() {
    let { label, name, schema, children, app, ...rest } = this.props;
    const visible = app.getIn([ this._parentProps.env.page, 'form', name, 'conditionals', 'visible' ]);
    // console.log(fieldProp, '......................................');
    return (    
      visible ?
        <Field name={ name } component={A10Field} label={label} {...rest}>
          { children || this.createElement(schema) }
        </Field>  
      : null
    );
  }
}

SchemaField.contextTypes = {
  props: PropTypes.object
};

export const A10SchemaField = connect(
  (state) => {
    return {
      app: state.getIn([ 'app' ]),
      pageForm: state.getIn([ 'form' ])
    };
  },
)(SchemaField);
