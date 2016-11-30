
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
    let { label, schema, description, layout, required, instanceData: { errorMsg }, children } = this.props;
    let status = {};

    if (errorMsg) {
      errorMsg = <HelpBlock className="error">{errorMsg}</HelpBlock>;
      status.validationState = 'error';
    }
    // console.log(this.props);
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
      <FormGroup bsClass="form-group" {...status}>
        {children}
        <FormControl.Feedback />
        {errorMsg}
      </FormGroup>
    );
  }
}

export default A10FieldLayout;
