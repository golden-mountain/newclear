import React from 'react';

import { Col, Row } from 'react-bootstrap';

import TemplateVirtualServerForm from 'pages/ADC/Templates/VirtualServer/components/Form';
import AppManager from 'helpers/AppManager';
import BasePage from 'pages/BasePage';

class TemplateVirtualServerEdit extends BasePage {
  render() {
    // const { handleSubmit,  ...rest } = this.props; // eslint-disable-line
    return (
      <Row>
        <Col xs={10}>
          <TemplateVirtualServerForm />
        </Col>
      </Row>
    );
  }
}


const InitializeFromStatePage = AppManager({
  page: 'teamplateVirtualServer',
  form: 'teamplateVirtualServerForm'
})(TemplateVirtualServerEdit);

export default InitializeFromStatePage;
