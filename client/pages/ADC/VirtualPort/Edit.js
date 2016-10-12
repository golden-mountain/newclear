import React, { Component } from 'react';

import { Col, Row } from 'react-bootstrap';

import VirtualPortForm from 'pages/ADC/VirtualPort/components/Form';
import AppManager from 'helpers/AppManager';


class VirtualPortEdit extends Component {
  render() {
    // const { handleSubmit,  ...rest } = this.props; // eslint-disable-line

    return (
      <Row>
        <Col xs={10}>
          <VirtualPortForm />
        </Col>
      </Row>
    );
  }
}


const InitializeFromStatePage = AppManager({
  page: 'virtualPort'
})(VirtualPortEdit);

export default InitializeFromStatePage;
