import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
// import invariant from 'invariant';
import { Map, List, fromJS } from 'immutable';
import { toPath } from 'lodash';
// import { getPageVar } from 'helpers/stateHelper';

class SchemaForm {
  constructor(context) {
    // invariant(schemas, 'Form schemas referred from your pages');
    const { schemas, edit, urlKeys } = context;
    this.context = context;
    this.schemas = schemas;
    this.isEdit = edit;
    this.urlKeys = urlKeys;
    this.state = {
      invalidProps: {}
    };

  }

  _parseAxapiURL(axapi, value) {
    let axapiOrg = axapi;
    if (this.isEdit !== true ) {
      axapiOrg = axapiOrg.replace(/\/[^\/]+?$/, '');
    }

    const path = axapiOrg.replace(/\{(.*?)\}/g, (matches, words) => { // eslint-disable-line
      // console.log(words, ' are mached words', this.urlKeys[words], ' keys from urlKeys');
      if (this.urlKeys && this.urlKeys[words]) {
        return this.urlKeys[words];
      } else {
        return value.getIn(words, '');
      }
    });
    // console.log(path, 'are submiting parth');
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
      let fullRequestData = null;
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
        fullRequestData = {
          path: this._parseAxapiURL(axapi, fieldGroup),
          method: 'POST', 
          body: parsedValues
        };    
        console.log('full auth data', fullRequestData);  
      }

      if (fullRequestData) {
        result = result.push(fullRequestData);  
      }      

    });

    // console.log('axapi path and result', result.toJS());
    return result;
  }

}

class A10SchemaForm extends Component {
  // context defined at page
  constructor(props, context) {
    super(props, context);
    if (!context.props) {
      throw new Error('Config should passed from parent');
    }

    this._context = context;
    this._parentProps = context.props;
  }

  defaultHandleSubmit(values) {
    // let visible data hidden
    let parsedValues = this.dataFinalize(values);
    // console.log(parsedValues, '.......................... after finalize');


    const schemaFormHandler = new SchemaForm(this.props);
    // console.log('build schema handler success');
    parsedValues = schemaFormHandler.parseValues(parsedValues);
    // console.log(parsedValues, 'submitted values');

    return this._context.props.axapiRequest(parsedValues);
  }

  dataFinalize(values) {
    let newValues = values;
    const formFields = this.props.app.getIn([ this._parentProps.env.page, 'form' ]);
    formFields.forEach((fieldProps, fieldName) => {
      const visible = fieldProps.getIn([ 'conditionals', 'visible' ]);
      // console.log(visible, ' is field visible, and field name is ', fieldName);

      if (!visible) {
        newValues = newValues.deleteIn(toPath(fieldName));
      }
    });

    // console.log('field values', newValues.toJS());
    return newValues;
  }

  render() {
    /* eslint-disable no-unused-vars */
    const { 
      urlKeys, 
      dispatch, 
      app, 
      schemas, 
      edit, 
      children, 
      onBeforeSubmit, 
      onAfterSubmit, 
      onSubmit, 
      ...rest 
    } = this.props; 
    /* eslint-enable no-unused-vars */
    // console.log(urlKeys, 'is url keys...............');
    const handleSubmit = this._context.props.handleSubmit;

    let submit = (values) => {
      let newValues = values, submitFunc = this.defaultHandleSubmit;
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

A10SchemaForm.contextTypes = {
  props: PropTypes.object
};

const A10Form = connect(
  (state) => {
    return {
      app: state.getIn([ 'app' ])
    };
  }
)(A10SchemaForm);

export default A10Form;
