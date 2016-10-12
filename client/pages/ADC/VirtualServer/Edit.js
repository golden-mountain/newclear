import React, { Component } from 'react';

import { Col, Row } from 'react-bootstrap';

import VirtualServerForm from 'pages/ADC/VirtualServer/components/Form';
import AppManager from 'helpers/AppManager';


class VirtualServerEdit extends Component {
  render() {
    // const { handleSubmit,  ...rest } = this.props; // eslint-disable-line

    return (
      <Row>
        <Col xs={2}>
          <h4>Help  </h4>
          {/* <Button onClick={::this.addLine} > Add a Line </Button> */}
        </Col>
        <Col xs={10}>
          <VirtualServerForm />
        </Col>
      </Row>
    );
  }
}


const InitializeFromStatePage = AppManager({
  page: 'virtualServer'
})(VirtualServerEdit);

export default InitializeFromStatePage;
