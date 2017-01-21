import React, { PropTypes } from 'react';
import { has } from 'lodash';

// import { fromJS } from 'immutable';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import widgetWrapper from '../../widgetWrapper';
import AutoField from './FieldWidgets/AutoField';

import FieldLayout from '../../layouts/FieldLayout';

class A10Field extends React.Component {
  static displayName =  'A10Field'

  registeredMVInputs = [ 'Checkbox', 'Radio', 'checkbox', 'radio' ];
  registeredInputs = this.registeredMVInputs.concat([ 'FormControl', 'input', 'select', 'textarea' ]);

  static contextTypes = {
    props: PropTypes.object,
    // context: PropTypes.object,
    cm: PropTypes.object
  }

  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    conditional: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]),
    layout: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.bool
    ])
  }

  constructor(props, context) {
    super(props, context);
    this.autoField = new AutoField(this.props.modelGetFieldProps(), this.props.modelGetSchema() );
  }

  findInputElements(children, allowedTypes, callback) {
    return React.Children.map(children, child => {
      if ((has(child, 'type.name') && allowedTypes.indexOf(child.type.name) > -1)
        || (has(child, 'type') && this.registeredInputs.indexOf(child.type) > -1)) {
        return callback(child);
      } else if (has(child, 'props.children')) {
        let newChild = this.findInputElements(child.props.children, allowedTypes, callback);
        return React.cloneElement(child, {}, newChild);
      } else {
        return child;
      }
    });
  }

  render() {
    let { children, modelChange: onChange, activeData, name,  ...fieldOptions } = this.props; //eslint-disable-line

    // console.log(name, activeData);
    const callback = (child) => {
      let inputOptions = { name, onChange };

      // only support React Bootstrap
      // to set value and checked for inputs
      if (this.registeredMVInputs.indexOf(child.type.name) > -1) {
        // console.log(child.type.name);
        const elementValue = child.props.value || true;
        const value = activeData === undefined ? true : activeData;
        inputOptions['checked'] = elementValue.toString() == value.toString();
      } else {
        // checkbox and radios can't set value, it will cause can't checked
        inputOptions['value'] = activeData;
      }

      // console.log(inputOptions);
      return  React.cloneElement(child, inputOptions );
    };

    if (!children) {
      children = this.autoField.autoGenElement(this.props);
    } else {
      children = this.findInputElements(children, this.registeredInputs, callback);
    }

    // console.log(fieldOptions);
    return (
      <FieldLayout {...fieldOptions} > {children} </FieldLayout>
    );
  }
}

export default widgetWrapper([ 'app' ]) (A10Field);
