
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
    const { label, schema, description, layout, required, meta: { touched, error }, children } = this.props;
    let status = {}, errorMsg = '';

    if (touched && error) {
      errorMsg = <HelpBlock className="error">{error}</HelpBlock>;
      status.validationState = 'error';
    }

    let defineDescription = '';
    description
    ? (defineDescription = description)
    : (schema && schema.description && (defineDescription = schema.description));
    return (
      layout === undefined || layout ?
      <FormGroup {...status}>
        <Col componentClass={ControlLabel} className={required ? 'required' : ''} sm={4} title={defineDescription}>{label}</Col>
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
