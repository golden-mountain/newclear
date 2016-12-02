import React from 'react';

import { FormControl } from 'react-bootstrap';
import { get, isEqual } from 'lodash';

import { A10Select } from './A10Select';
import { A10Radios } from './A10Radios';
// import A10Checkboxs from './A10Checkboxs';
// import A10Button from './A10Button';
// import A10MultiField from './A10MultiField';

export default class AutoField {
  constructor(fieldSchema, schema) {
    this.fieldSchema = fieldSchema;
    this.schema = schema;
    // this.fieldName = fieldName;
  }

  autoGenElement(props) {
    const fieldProps = this.fieldSchema;
    const { modelChange: onChange, name, activeData, data, widgetProps } = props;
    const validProps = { onChange, name, data, value: activeData };
    // console.log(fieldProps);
    // console.log(value, name);
    // generate by seq
    const _has = (prop, ruleParam) => {
      let result = get(fieldProps, prop, false);
      if (ruleParam) {
        return result === ruleParam;
      } else {
        return result !== false;
      }
    };

    const _eq = (prop, expect) => {
      const value = get(fieldProps, prop, '');
      return isEqual(value, expect);
    };

    const _in = (prop, expects) => {
      const value = get(fieldProps, prop, '');
      return expects.indexOf(value) > -1;
    };

    const defaultAttrs = {
      'example-default': 'value',
      'default': 'value'
    };

    // console.log(A10Select, A10Radios);
    const fieldTypeMaps = [
      {
        com: A10Select,
        attrs: defaultAttrs,
        widgetProps: widgetProps,
        depend: { rule: _has, prop: '$ref' }
      },
      {
        com: A10Radios,
        attrs: { 'enumMap' : 'options', ...defaultAttrs },
        widgetProps: widgetProps || {},
        depend: { rule: _eq, prop: 'enum', ruleParam: [ 'enable', 'disable' ] }
      },
      {
        com: FormControl,
        componentClass: 'select',
        attrs: { 'enumMap' : 'options', ...defaultAttrs },
        depend: { rule: _has, prop: 'enum' }
      },
      {
        com: FormControl,
        type: 'text',
        attrs: defaultAttrs,
        depend: { rule: _in, prop: 'type', ruleParam: [ 'number', 'string' ] }
      },
      {
        com: FormControl,
        componentClass: 'textarea',
        attrs: defaultAttrs,
        depend: { rule: _has, prop: 'src-name', ruleParam: 'description' }
      }
    ];

    const mapAttrs = (attrs) => {
      let props = {};
      for (let prop in attrs) {
        const mapTo = attrs[prop];
        if (typeof mapTo === 'function') {
          props = mapTo(prop);
        } else if(get(fieldProps, prop)) {
          // console.log(name, prop, mapTo, get(fieldProps, prop));
          props[mapTo] = get(fieldProps, prop);
        }
      }
      return props;
    };


    // const rules = [ _has, _eq, _in ];
    let ComponentClass = FormControl, elementProps = {};
    for (let index in fieldTypeMaps) {
      const { com, depend: { rule, prop, ruleParam }, attrs,  ...rest } = fieldTypeMaps[index];
      if (rule(prop, ruleParam)) {
        ComponentClass = com;
        elementProps = Object.assign({}, rest, mapAttrs(attrs));
        break;
      }
    }

    const mergedProps = Object.assign({}, elementProps, validProps);

    // patch : Warning: FormControl is changing an uncontrolled input of type
    if (mergedProps.value === undefined) {
      mergedProps.value = '';
    }

    return (<ComponentClass {...mergedProps} />);
  }
}
