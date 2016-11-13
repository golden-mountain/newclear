import React, { PropTypes } from 'react';
import { has } from 'lodash';

// import { fromJS } from 'immutable';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { widgetWrapper } from 'helpers/widgetWrapper';
import AutoField from 'components/Field/AutoField';

import configApp from 'configs/app';

const OEM = configApp.OEM;
const FieldLayout = require('oem/' + OEM + '/FieldLayout').default;


class A10Field extends React.Component {
  static displayName =  'A10Field'

  static contextTypes = {
    props: PropTypes.object,
    // context: PropTypes.object,
    cm: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
    this.autoField = new AutoField(this.props.getFieldProps(), this.props.getSchema() );
  }

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

  render() {
    let { children, change: onChange, activeData, name,  ...fieldOptions } = this.props; //eslint-disable-line

    const registeredMVInputs = [ 'Checkbox', 'Radio' ];
    const registeredInputs = registeredMVInputs.concat([ 'FormControl' ]);

    // console.log(name, activeData);
    const callback = (child) => {
      let inputOptions = { name, onChange };

      // only support React Bootstrap
      // to set value and checked for inputs
      if (registeredMVInputs.indexOf(child.type.name) > -1) {
        // console.log(child.type.name);
        const elementValue = child.props.value || true;
        const value = activeData === undefined ? true : activeData;
        inputOptions['checked'] = elementValue.toString() == value.toString();
      }

      // console.log(inputOptions);
      return  React.cloneElement(child, inputOptions );
    };

    if (!children) {
      children = this.autoField.autoGenElement(this.props);
    } else {
      children = this.findInputElements(children, registeredInputs, callback);
    }

    return (
      <FieldLayout {...fieldOptions} > {children} </FieldLayout>
    );
  }
}

export default widgetWrapper([ 'app' ]) (A10Field);
