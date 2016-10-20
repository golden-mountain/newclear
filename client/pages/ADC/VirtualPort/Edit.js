import React from 'react';

import { Col, Row } from 'react-bootstrap';

import VirtualPortForm from './components/Form';

export default class VirtualPortEdit extends React.Component {


  render() {

    return (
      <Row>
        <Col xs={10}>
          <VirtualPortForm />
        </Col>
      </Row>
    );
  }
}

