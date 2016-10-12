import React, { Component } from 'react';

import { Col, Row } from 'react-bootstrap';

import TemplateVirtualServerForm from 'pages/ADC/Templates/VirtualServer/components/Form';
import AppManager from 'helpers/AppManager';


class TemplateVirtualServerEdit extends Component {
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
  page: 'teamplateVirtualServer'
})(TemplateVirtualServerEdit);

export default InitializeFromStatePage;
