import React from 'react';

import { Col, Row } from 'react-bootstrap';

import VirtualServerForm from './components/Form';
import PageBase from 'helpers/PageBase';

export default class VirtualServerEdit extends PageBase {

  render() {

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
