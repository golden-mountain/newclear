
import React, { Component } from 'react';

import {
  FormGroup,
  FormControl,
  ControlLabel,
  Col,
  HelpBlock
} from 'react-bootstrap';


class A10FieldLayout extends Component {
  render() {
    const { label, layout, meta: { touched, error }, children } = this.props;
    let status = {}, errorMsg = '';

    if (touched && error) {
      errorMsg = <HelpBlock className="error">{error}</HelpBlock>;
      status.validationState = 'error';
    }

    return (
      layout === undefined || layout ?
      <FormGroup {...status}>
        <Col componentClass={ControlLabel} sm={4}>{label}</Col>
        <Col sm={8}>
          {children}
          <FormControl.Feedback />
          {errorMsg}
        </Col>
      </FormGroup>
      :
      <FormGroup bsClass="no-layout" {...status}>
        {children}
        <FormControl.Feedback />
        {errorMsg}
      </FormGroup>
    );
  }
}

export default A10FieldLayout;
