import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
// import invariant from 'invariant';
import { Map, List, fromJS } from 'immutable';
import { toPath, has } from 'lodash';
import { getAppValueStore } from 'helpers/stateHelper';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { FORM_FIELD_KEY } from 'configs/appKeys';
import { UPDATE_TARGET_DATA, HIDE_COMPONENT_MODAL, REDIRECT_ROUTE } from 'configs/messages';

class SchemaForm {
  static displayName = 'SchemaForm'

  constructor({ schemas, edit, urlParams, removePrefix }) {
    // invariant(schemas, 'Form schemas referred from your pages');
    // const { schemas, edit, urlParams } = context;
    // console.log(schemas, isEdit, urlParams );
    // this.context = context;
    this.schemas = schemas;
    this.isEdit = edit;
    this.urlParams = fromJS(urlParams);
    this.removePrefix = removePrefix;
    this.state = {
      invalidProps: {}
    };
  }

  getAxapiURL(axapi, groupName) {
    let axapiOrg = axapi;
    if (this.isEdit !== true ) {
      axapiOrg = axapiOrg.replace(/\/[^\/]+?$/, '');
    }

    const path = axapiOrg.replace(/\{(.*?)\}/g, (matches, words) => { // eslint-disable-line
      // console.log(words, ' are mached words', this.urlParams[words], ' keys from urlParams');
      // if (this.urlParams && this.urlParams[words]) {
      //   return this.urlParams[words];
      // } else {
      //   return value.getIn(words, '');
      // }
      const value = this.urlParams.getIn([ groupName, words ]);
      // console.log(value);
      return value;
    });
    // console.log(path, 'are submiting parth');
    return path;
  }

  getObjectPrefixes() {
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
    // console.log(values);
    let newValues = fromJS(values);
    // removePrefix example: template.virtual-server.xx
    // will remove template, use this to add name space to each form
    // to avoid same name to recover each other on redux form
    if (this.removePrefix && newValues.getIn([ this.removePrefix ], false)) {
      newValues = newValues.getIn([ this.removePrefix ]);
    }

    const prefixes = this.getObjectPrefixes();

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
          path: this.getAxapiURL(axapi, fieldGroupName),
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
  static displayName = 'A10SchemaForm'
  // static componentId = uniqueId('A10SchemaForm-')

  static contextTypes = {
    props: PropTypes.object,
    ballKicker: PropTypes.object
  }

  // context defined at page
  constructor(props, context) {
    super(props, context);
    if (!context.props) {
      throw new Error('Config should passed from parent');
    }
    // this.context.props = context.props;
    const { schemas, removePrefix } = this.props;
    const { urlParams, edit } = this.context.props;
    this.isEdit = edit;
    this.schemaHandler = new SchemaForm({ schemas, edit, urlParams, removePrefix });
    // console.log(this.context.props, this.props);
  }

  componentWillMount() {
    if (this.isEdit) {
      let requests = [];
      this.props.schemas.forEach((schema) => {
        const requestURL = this.schemaHandler.getAxapiURL(schema.axapi, schema['obj-name']);
        const request = {
          path: requestURL,
          method: 'GET'
        };
        requests.push(request);
      });
      const result = this.props.comAxapiRequest(requests);
      result.then(() => {
        let data = fromJS(this.props.data);
        if (typeof this.props.onInitialize === 'function') {
          data = this.props.onInitialize(data);
        }
        this.context.props.initialize(data);
        // TODO:
        // after initialized, need reinitialConditional
      });
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.data) {
  //     this.context.props.initialize(nextProps.data);
  //   }
  // }

  // connect
  connectValues(storeData, parsedValues) {
    // console.log(parsedValues);
    // const { fieldConnector: { options: { connectToApiStore } } } = this.context.props;
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
      // console.log('parsed values on default submitter', mergingObj.toJS());
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
    parsedValues = this.schemaHandler.parseValues(parsedValues);
    // console.log('parsed values::::', parsedValues);

    if (save) {
      // console.log('test......0.1');
      let storeData = getAppValueStore(this.props.app);
      if (storeData.length) {
        parsedValues = this.connectValues(storeData, parsedValues);
      }
      const promise = this.props.comAxapiRequest(parsedValues, true);
      // console.log(' returned promise ', promise);
      if (promise) {
        // TODO: release the store
        // promise.finally(() => {
        //   this.context.props.storeApiInfo(form, false);
        // });
        // console.log('returned from propmise');
      }

      return promise;
    } else {
      // console.log('dont save');
      // console.log(values, form, save);
      this.context.props.storeApiInfo(form, parsedValues, this.context.props.fieldConnector.options);
      return new Promise((resolve, reject) => { // eslint-disable-line
        resolve(parsedValues);
      });
    }
  }

  dataFinalize(values) {
    let newValues = values;
    const instanceParentPath = this.props.findParent(A10SchemaForm.displayName);
    // console.log(instanceParentPath);
    const formFields = this.props.page.getIn([ ...instanceParentPath, FORM_FIELD_KEY ]);
    formFields.forEach((fieldProps, fieldName) => {
      const visible = fieldProps.getIn([ 'conditionals', 'visible' ]);

      if (!visible) {
        newValues = newValues.deleteIn(toPath(fieldName));
      }
    });

    return newValues;
  }

  render() {
    const {
      instancePath,
      targetInstancePath,
      children,
      onBeforeSubmit,
      onAfterSubmit,
      onSubmit,
      // Form props
      bsClass,
      componentClass,
      horizontal,
      inline
    } = this.props;
    // console.log(data);
    // console.log(urlParams, 'is url keys...............');
    const { handleSubmit, fieldConnector } = this.context.props;
    // const parentInstancePath = this.props.findParent('A10SchemaForm');
    // console.log(this.context.props, this.props);
    let submit = (values) => {
      // validation triggle
      const parentInstancePath = this.props.findParent(A10SchemaForm.displayName);
      this.props.comTriggleValidation(parentInstancePath);

      let newValues = values, patchedValues = Map(), submitFunc = this.defaultHandleSubmit;
      if (onBeforeSubmit) {
        patchedValues = onBeforeSubmit(newValues);
      }
      // console.log('test............');

      // let visible data hidden
      newValues = this.dataFinalize(newValues);
      // console.log('test............1');

      // patch values need keep outside newValues, otherwise, data finalizer could be remove it by visible
      newValues = newValues.mergeDeep(fromJS(patchedValues));

      if (onSubmit) {
        submitFunc = onSubmit;
      }
      // console.log(submitFunc);

      let result = null;
      if (has(fieldConnector , 'options.connectToValue')) {
        // console.log('3');
        // fieldConnector.connectToValues(newValues);
        result = submitFunc.call(this, newValues, instancePath[0], false);
        // console.log('3.1');
      } else {
        // console.log('4');
        result = submitFunc.call(this, newValues, instancePath[0], true);
        // console.log('5');
        // fieldConnector.connectToResult(result);
        if (onAfterSubmit) {
          result = onAfterSubmit.call(this, result);
        }
      }

      result.then(() => {
        this.props.kickBall(UPDATE_TARGET_DATA, newValues, targetInstancePath );
        if (this.context.props.modal) {
          this.props.kickBall(HIDE_COMPONENT_MODAL, null, parentInstancePath);
        } else {
          this.props.kickBall(REDIRECT_ROUTE, { path: 'list' });
        }

      });
      return result;
    };

    // console.log('.......................................', children);
    const formProps = { bsClass, componentClass, horizontal, inline };
    return (
      <Form onSubmit={ handleSubmit(submit) } { ...formProps }>
        { children }
      </Form>
    );
  }
}

export default widgetWrapper()(A10SchemaForm);
