import React from 'react';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { widgetWrapper } from 'helpers/widgetWrapper';
// import { FormControl, FormGroup, ControlLabel, Col, Button, HelpBlock } from 'react-bootstrap';
import configApp from 'configs/app';

const OEM = configApp.OEM;
const FieldLayout = require('oem/' + OEM + '/FieldLayout').default;

class A10Field extends React.Component {
  static displayName =  'A10Field'

  change(event) {
    // console.log(event.target.value);
    this.props.hold(event.target.value);
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <FieldLayout onChange={::this.change} {...rest} > {children} </FieldLayout>
    );
  }
}

export default widgetWrapper([ 'app' ]) (A10Field);
