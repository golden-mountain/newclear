import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
// import invariant from 'invariant';
import { Map, List, fromJS } from 'immutable';
import { toPath, has } from 'lodash';
import { getAppValueStore } from 'helpers/stateHelper';

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

  // remove invalid values by schema
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
        // console.log('full auth data', fullRequestData);  
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

  // connect 
  connectValues(storeData, parsedValues) {
    // const { fieldConnector: { options: { connectToApiStore } } } = this._parentProps;
    let primaryObj = parsedValues.first(), mergingObj = Map(), copyStoreData = [];
    storeData.forEach((apiRequestData) => {
      if (apiRequestData.connectOptions) {
        const { connectToApiStore: { source, target, targetIsArray } } = apiRequestData.connectOptions;
        const value = source ? apiRequestData.body.getIn([ source ]) : apiRequestData.body;
        if (targetIsArray || storeData.length > 1) {
          let l = mergingObj.getIn(toPath(target), List());
          l = l.push(value);
          mergingObj = mergingObj.setIn( toPath(target), l);
        } else {
          mergingObj =  mergingObj.setIn( toPath(target), value);
        }
      } else {
        copyStoreData.push(apiRequestData);
      }
    });

    if (mergingObj.size) {
      primaryObj.body = primaryObj.body.mergeDeep(mergingObj);
      parsedValues = parsedValues.set(0, primaryObj);
    }

    if (copyStoreData.length) {
      return parsedValues.concat(copyStoreData);
    } else {
      return parsedValues;
    }
    
  }

  defaultHandleSubmit(values, form, save=true) {
    let parsedValues = values;
    const schemaFormHandler = new SchemaForm(this.props);
    parsedValues = schemaFormHandler.parseValues(parsedValues);

    if (save) {
      let storeData = getAppValueStore(this.props.app);
      if (storeData.length) {
        parsedValues = this.connectValues(storeData, parsedValues);
      }
      // console.log('saving data:::::::::::::::', savingData);
      const promise = this._context.props.axapiRequest(parsedValues);
      if (promise) {
        promise.finally(() => {
          this._context.props.storeApiInfo(form, false);
        });
      }
      return promise;
    } else {
      this._context.props.storeApiInfo(form, parsedValues, this._parentProps.fieldConnector.options);
      return new Promise((resolve, reject) => { // eslint-disable-line
        resolve(parsedValues);
      });
    }
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
    const { handleSubmit, fieldConnector, env } = this._parentProps;

    let submit = (values) => {
      let newValues = values, patchedValues = Map(), submitFunc = this.defaultHandleSubmit;
      if (onBeforeSubmit) {
        patchedValues = onBeforeSubmit(newValues);
      } 

      // let visible data hidden
      newValues = this.dataFinalize(newValues);
      // patch values need keep outside newValues, otherwise, data finalizer could be remove it by visible
      newValues = newValues.mergeDeep(fromJS(patchedValues));

      if (onSubmit) {
        submitFunc = onSubmit;
      }

      let result = null;
      // close win
      // TODO: decide how to close this form page
      const closeCurrent = () => {
        // if popup, close win
        // else return to some page
        this._parentProps.setLastPageVisible(false);
      };
      // update values
      if (has(fieldConnector , 'options.connectToValue')) {
        fieldConnector.connectToValues(newValues);
        result = submitFunc.call(this, newValues, env.form, false);        
      } else {
        result = submitFunc.call(this, newValues, env.form, true);
        fieldConnector.connectToResult(result);

        if (onAfterSubmit) {
          result = onAfterSubmit.call(this, result);
        } 
      }
  
      result.then(closeCurrent);
      return result;
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
