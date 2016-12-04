import React from 'react';
// import { Col, Row, Panel, Radio, Checkbox, FormControl } from 'react-bootstrap';
// import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';

import {  widgetWrapper } from 'a10-widget'; //A10Field, A10MultiField, A10Form,

// const makeError = (status=true, errMsg='') => ( status ? '' : errMsg );

// const ipv4 = (value) => {
//   const reg = /^(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$/;
//   return makeError(reg.test(value), 'IPv4 Required');
// };

class SecurityServiceForm extends React.Component {
  static displayName = 'SecurityServiceForm'


  render() {

    return (
      <h3>test</h3>
    );
  }
}


export default widgetWrapper()(SecurityServiceForm);
