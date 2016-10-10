import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, Col, HelpBlock } from 'react-bootstrap';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'redux-form/immutable'; // imported Field
import { fromJS, Map } from 'immutable';
import { has, toPath, isEqual } from 'lodash';
// import ReactTestUtils from 'react-addons-test-utils';
import A10Select from 'components/Form/A10Select';

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
        <Col componentClass={ControlLabel} sm={4}>{label}</Col>
        <Col sm={8}>
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
const registeredInputs = registeredMVInputs.concat([ 'FormControl' ]);

export class A10Field extends Component {

  findInputElements(children, allowedTypes, callback) {
    return React.Children.map(children, child => {
      if (has(child, 'type.name') && allowedTypes.indexOf(child.type.name) > -1) {
        return callback(child);
      } else if (has(child, 'props.children')) {
        let newChild = this.findInputElements(child.props.children, allowedTypes, callback);
        return React.cloneElement(child, {}, newChild);
      } else {
        return child;
      }
    });
  }

  createElement() {
    let { input, schema, widgetProps } = this.props;
    // console.log(widgetOptions, 'widgetOptions......................');
    let type = schema && schema.type ? schema.type : 'string';
    const Rules = Map({
      selector: (schema) => {
        // In Virtual server VIRD, there isn't `$ref`, but need add button.
        if (schema && schema['$ref']) {
          return {
            'component': A10Select,
            'className': 'form-control'
          };
        } else {
          return false;
        }     
      }
    });

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

    let element = null;
    Rules.forEach((rule) => {
      element = rule(schema);
      if (element) {
        return element;
      } 
    });

    element = element || elementsMap[type] || elementsMap['string'];
    const { component, ...props } = element;
    return React.createElement(component, Object.assign(input, props, widgetProps));
  }

  render() {
    let { children, input, ...fieldOptions } = this.props;
    const callback = (child) => {      
      let inputOptions = {};     

      const { value, ...restInput } = input;
      // only support React Bootstrap
      // to set value and checked for inputs
      if (registeredMVInputs.indexOf(child.type.name) > -1) {
        // console.log('mv element is:', restInput.name);
        inputOptions['checked'] = child.props.value === value;
      } else {
        // console.log('text element is:', restInput.name);
        inputOptions['value'] = value;
      }

      // console.log('input options:', { ...inputOptions, ...restInput });
      return  React.cloneElement(child, { ...inputOptions, ...restInput });
    };

    if (!children) {
      children = this.createElement() ;
    }
    let newChild = this.findInputElements(children, registeredInputs, callback);
    // newChild = React.Children.map(newChild, callback);
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
  }

  componentWillMount() {
    // if (this.props.schema) {
    const { schema, value, name } = this.props;  
    let { validation, conditional } = this.props;
    // register initialValues
    let defaultValue = value !== undefined ? value : (schema ? schema.default : null);
    if (value) {
      let values = this.props.pageForm.getIn([ this._parentProps.env.form, 'values' ], Map());    
      values = values.setIn(name.split('.'), value);    
      this._parentProps.initialize(values.toJS());
    }

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
  }

  shouldComponentUpdate(nextProps) {
    const { name } = this.props; 
    const fieldNext = nextProps.app.getIn([ this._parentProps.env.page, 'form', name ]);
    const fieldThis = this.props.app.getIn([ this._parentProps.env.page, 'form', name ]);
    const fieldNextValue = nextProps.pageForm.getIn([ this._parentProps.env.form, 'values', ...toPath(name) ]);    
    const fieldThisValue = this.props.pageForm.getIn([ this._parentProps.env.form, 'values', ...toPath(name) ]);
    return !fieldNext.equals(fieldThis) || !isEqual(fieldThisValue, fieldNextValue);
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

  render() {
    let { name, children, app, ...rest } = this.props; // eslint-disable-line
    const visible = app.getIn([ this._parentProps.env.page, 'form', name, 'conditionals', 'visible' ]);
    // console.log(fieldProp, '......................................');
    return (    
      visible ?
        <Field name={name} component={A10Field} {...rest}>
          { children }
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
