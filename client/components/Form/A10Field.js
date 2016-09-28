import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, Col, HelpBlock } from 'react-bootstrap';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'redux-form/immutable'; // imported Field
// import { Map } from 'immutable';
// import { isEqual } from 'lodash';

// import * as logger from 'helpers/logger';

class A10FieldLayout extends Component {
  render() {
    const { label, meta: { touched, error }, children } = this.props;
    let status = {}, errorMsg = '';

    if (touched && error) {
      errorMsg = <HelpBlock className="error">{error}</HelpBlock>;
      status.validationState = 'error';
    }

    return (
      <FormGroup {...status}>
        <Col componentClass={ControlLabel} sm={2}>{label}</Col>
        <Col sm={10}>
          {children}
          <FormControl.Feedback />
          { errorMsg }
        </Col>
      </FormGroup>
    );
  }  
}

// multiple options input
const registeredMVInputs = [ 'Checkbox', 'Radio' ];

export class A10Field extends Component {

  render() {
    const { children, input, ...fieldOptions } = this.props;
    return (
      <A10FieldLayout {...fieldOptions}>
        {
          React.Children.map(children, (child) => {
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
          })
        }
      </A10FieldLayout>
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
    this._parentForm = this.props.pageForm.getIn([ context.props.env.form ]);    
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
    // console.log(this._parentProps); 
    this._parentProps.registerPageField(this.props.name, {
      validations: this.parseValidation(),
      conditionals: {
        'x.virtual-server.address-type': '0'
      }
    });     
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

  parseValidation() {
    const { schema } = this.props;
    // const foo = function foo(value) {
    //   logger.debug(value);
    //   return 'Error!!';
    // };
    const minimum = (param) => (value) => parseInt(value) >= parseInt(param) ? '' : `Minimum value greater than ${param}`; 
    const maximum = (param) => (value) => parseInt(value) <= parseInt(param) ? '' : `Maximum value less than ${param}`;
    const validationFuncs = { 
      'minimum': minimum(schema['minimum']),
      'maximum': maximum(schema['maximum']),
      'minimum-partition': minimum(schema['minimum-partition']),
      'maximum-partition': maximum(schema['maximum-partition'])
    };
    let validations = {};
    Object.keys(schema).forEach((key) => {
      if (validationFuncs[key] !== undefined ) {
        validations[key] = validationFuncs[key];
      }
    });
    return validations;
  }

  render() {
    let { label, name } = this.props;

    return (
      <Field name={ name } component={A10Field} label={label}>
        <FormControl type="text" className="form-control"/>
      </Field>      
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
