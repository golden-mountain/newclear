import { get } from 'lodash';

export default class Schema {

  constructor(schema) {
    // console.log(schema);
    if (typeof schema == 'string') {
      // require js
      try {
        const schemas = schema.split('.');
        schema = require('schemas/' + schemas[0] + '.json');
        const getSchema = (objectSchema, schemas) => {
          const currentNode = schemas[0];
          if (objectSchema.properties[currentNode]) {
            schemas.shift();
            if (schemas.length) {
              return getSchema(objectSchema.properties[currentNode], schemas);
            } else {
              return objectSchema.properties[currentNode];
            }
          } else {
            return objectSchema;
          }
        };
        schemas.shift();
        schema = getSchema(schema, schemas);
      } catch (e) {
        console.error(e);
      }
    }
    this.schema = schema;
    this.object = schema.properties || {};
  }

  getAxapiURL(urlParams) {
    let axapiOrg = this.schema.axapi;
    if (axapiOrg) {
      const path = axapiOrg.replace(/\{(.*?)\}/g, (matches, words) => { // eslint-disable-line
        if (!urlParams) {
          return '';
        } else {
          return urlParams[words] || '';
        }
      });
      return path;
    } else {
      return '';
    }
  }

  _getFieldProp(fieldName, prop, defaultValue='') {
    return get(this.object, `${fieldName}.${prop}`, defaultValue);
  }

  getConditional(fieldName) {
    const conditional = this._getFieldProp(fieldName, 'condition', '');
    if (conditional) {
      return { [ conditional ] : true };
    } else {
      return false;
    }
  }

}
