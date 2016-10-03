import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import invariant from 'invariant';
import { Map, List, fromJS } from 'immutable';
// import { toPath } from 'lodash';

class SchemaForm {
  constructor(schemas, edit) {
    invariant(schemas, 'Form schemas referred from your pages');

    this.schemas = schemas;
    this.isEdit = edit;
    this.state = {
      invalidProps: {}
    };

  }

  _parseAxapiURL(axapi, value) {
    let axapiOrg = axapi;
    if (this.isEdit !== true ) {
      axapiOrg = axapiOrg.replace(/\{.*?\}\/?/, '');
    }

    const path = axapiOrg.replace(/(\{.*?\})/g, function(matches, words) { // eslint-disable-line
      return value.getIn(words, '');
    });
    return path;
  }

  _getObjectPrefixes() {
    let prefixes = {};
    this.schemas.forEach((schema) => {
      // console.log(schema);
      prefixes[schema['obj-name']] = schema;
    });
    // console.log(this.schemas, ' this schemas');
    return prefixes;
  }

  parseValues(values) {
    const newValues = fromJS(values);
    const prefixes = this._getObjectPrefixes();    

    let parsedValues = Map({});
    let invalidProps = Map({});

    let result = List();
    // console.log(prefixes, ' prefixes ................');

    newValues.forEach((fieldGroup, fieldGroupName) => {
      // console.log(fieldGroupName, ' field group name');
      let fullAuthData = null;
      if (prefixes[fieldGroupName]) {
        const { properties, axapi } = prefixes[fieldGroupName];
        // check each properties
        fieldGroup.forEach((fieldValue, fieldName) => { // eslint-disable-line
          // console.log('properties.....', properties[fieldName], 'fieldName', fieldName);
          if (properties[fieldName]) {
            parsedValues = parsedValues.setIn([ fieldGroupName, fieldName ], fieldValue);
          } else {
            invalidProps = invalidProps.setIn([ fieldGroupName, fieldName ], fieldValue);
          }
        });
        fullAuthData = {
          path: this._parseAxapiURL(axapi, fieldGroup),
          method: 'POST', 
          body: parsedValues
        };        
      }

      if (fullAuthData) {
        result = result.push(fullAuthData);  
      }      

    });

    // console.log('axapi path and result', result.toJS());
    return result;
  }

}

class A10Form extends Component {
  // context defined at page
  constructor(props, context) {
    super(props, context);
    if (!context.props) {
      throw new Error('Config should passed from parent');
    }

    this._context = context;
  }

  defaultHandleSubmit(values) {
    const schemaFormHandler = new SchemaForm(this.props.schemas, this.props.edit);
    // console.log('build schema handler success');
    const parsedValues = schemaFormHandler.parseValues(values);
    // console.log(parsedValues, 'submitted values');
    return this._context.props.axapiRequest(parsedValues);
  }

  render() {
    const { schemas, edit, children, onBeforeSubmit, onAfterSubmit, onSubmit, ...rest } = this.props; //eslint-disable-line
    const handleSubmit = this._context.props.handleSubmit;

    let submit = (values) => {
      let newValues = values, submitFunc = ::this.defaultHandleSubmit;
      if (onBeforeSubmit) {
        newValues = onBeforeSubmit(newValues);
      } 

      if (onSubmit) {
        submitFunc = onSubmit;
      }

      let result = submitFunc.call(this, newValues);

      if (onAfterSubmit) {
        return onAfterSubmit.call(this, result);
      } else {
        return result;
      }
    };

    // console.log(onSubmit, '..............');
    return (
      <Form onSubmit={ handleSubmit(submit) } { ...rest }>
        { children }
      </Form>      
    );
  }
}

A10Form.contextTypes = {
  props: PropTypes.object
};

// const A10Form = connect(
//   // (state) => {
//   //   return {
//   //     app: state.getIn([ 'app' ]),
//   //     pageForm: state.getIn([ 'form' ])
//   //   };
//   // },
// )(MyForm);

export default A10Form;
