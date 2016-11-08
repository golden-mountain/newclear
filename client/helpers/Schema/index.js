import { Map, List, fromJS } from 'immutable';

export default class Schema {

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
    // console.log(this.urlParams);
    if (this.isEdit !== true ) {
      axapiOrg = axapiOrg.replace(/\/[^\/]+?$/, '');
    }

    // console.log('--------------', axapiOrg);
    const path = axapiOrg.replace(/\{(.*?)\}/g, (matches, words) => { // eslint-disable-line
      // console.log(words, ' are mached words', this.urlParams, ' keys from urlParams');
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
    if (!this.schemas) {
      return {};
    }

    let prefixes = {};
    // console.log(this.schemas, ' this schemas');

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
    // console.log('..............', newValues);
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
          if (properties[fieldName]) {
            parsedValues = parsedValues.setIn([ fieldGroupName, fieldName ], fieldValue);
          } else {
            invalidProps = invalidProps.setIn([ fieldGroupName, fieldName ], fieldValue);
          }
        });
        // console.log('full auth data..............');

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
