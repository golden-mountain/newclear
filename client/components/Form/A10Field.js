import React, { Component, PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { Field } from 'redux-form/immutable'; // imported Field
import { fromJS, Map } from 'immutable';
import { has } from 'lodash';
// import ReactTestUtils from 'react-addons-test-utils';
import A10Select from 'components/Form/A10Select';
// import * as logger from 'helpers/logger';
import createValidationFuncs from 'helpers/validations';

import FieldLayout from 'layouts/a10/FieldLayout';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { FORM_FIELD_KEY } from 'configs/appKeys';

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

  generatorPlaceholder() {
    const { placeholder, schema } = this.props;
    const generator = {
      string: (schema) => {
        return `${schema.minLength} - ${schema.maxLength} character.`;
      },
      number: (schema) => {
        return `${schema.minimum} - ${schema.maximum} number.`;
      }
    };
    let definePlaceholder = '';
    placeholder
    ? (definePlaceholder = placeholder)
    : (
      schema
      && schema.type
      && generator[schema.type]
      && (definePlaceholder = generator[schema.type](schema))
    );

    return definePlaceholder;
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
    props['placeholder'] = this.generatorPlaceholder();
    return React.createElement(component, Object.assign(input, props, widgetProps));
  }

  render() {
    let { children, input, onChange, onBlur, ...fieldOptions } = this.props; //eslint-disable-line
    const callback = (child) => {
      let inputOptions = {};

      let { value, ...restInput } = input;
      // only support React Bootstrap
      // to set value and checked for inputs
      if (registeredMVInputs.indexOf(child.type.name) > -1) {
        inputOptions['checked'] = child.props.value.toString() == value.toString();
      } else {
        inputOptions['value'] = value;
      }

      const getEventValue = (event) => {
        let value = event.target.value;
        if(event.target.checked !== undefined) {
          if (typeof event.target.value == 'string') {
            if (!event.target.checked) {
              value = '';
            }
          }
        }
        return value;
      };

      inputOptions.onChange = (event) => {
        let value = getEventValue(event);
        let result = restInput.onChange(event);
        onChange(value);
        return result;
      };

      inputOptions.onBlur = (event) => {
        let value = getEventValue(event);
        let result = restInput.onBlur(event);
        onBlur(value);
        return result;
      };
      // console.log(restInput.onChange,  child);
      return  React.cloneElement(child, { ...restInput, ...inputOptions });
    };

    if (!children) {
      children = this.createElement() ;
    }
    let newChild = this.findInputElements(children, registeredInputs, callback);
    return (
      <FieldLayout {...fieldOptions}> { newChild } </FieldLayout>
    );
  }
}

class SchemaField extends Component {
  static displayName = 'SchemaField'

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

    // console.log('schema field instancePath', this.context.props.instancePath);
    // this.context.props = this.context.props;
  }

  componentWillMount() {
    // if (this.props.schema) {
    const { schema, value, name } = this.props;
    let { validation, conditional } = this.props;
    // register initialValues
    let defaultValue = value !== undefined ? value : (schema ? schema.default : null);
    let values = this.props.form.getIn([ this.context.props.env.form, 'values' ], Map());
    values = values.setIn(name.split('.'), defaultValue);
    this.context.props.initialize(values.toJS());

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
    const instanceParentPath = this._registeredPath();
    // console.log(instanceParentPath);
    this.props.comRegisterPageField(instanceParentPath, name, fromJS(fieldOptions));
  }

  _registeredPath() {
    return this.props.findParent('A10SchemaForm');
  }

//   shouldComponentUpdate(nextProps) {
//     const { name } = this.props;
//     const fieldNext = nextProps.app.getIn([ this.context.props.env.page, 'form', name ]);
//     const fieldThis = this.props.app.getIn([ this.context.props.env.page, 'form', name ]);
//     const fieldNextValue = nextProps.form.getIn([ this.context.props.env.form, 'values', ...toPath(name) ]);
//     const fieldThisValue = this.props.form.getIn([ this.context.props.env.form, 'values', ...toPath(name) ]);
//     return !fieldNext.equals(fieldThis) || !isEqual(fieldThisValue, fieldNextValue);
//   }

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
    const instanceParentPath = this._registeredPath();

    const visible = app.getIn([ ...instanceParentPath, FORM_FIELD_KEY, name, 'conditionals', 'visible' ]);

    const onChange = (value) => {
      console.log(instanceParentPath);
      ::this.props.comSetFieldConditial(instanceParentPath, name, value);
    };

    const onBlur = (value) => {
      ::this.props.comTriggleValidation(instanceParentPath, name, value);
    };

    return (
      visible ?
        <Field name={name} component={A10Field} onChange={onChange} onBlur={onBlur} {...rest}>
          { children }
        </Field>
      : null
    );
  }
}

export const A10SchemaField = widgetWrapper()(SchemaField);
