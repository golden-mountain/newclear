import React from 'react';

import { Col, Row } from 'react-bootstrap';

import VirtualServerForm from './components/Form';

export default class VirtualServerEdit extends React.Component {

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
