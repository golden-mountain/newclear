import React from 'react';

import { Col, Row } from 'react-bootstrap';

import TemplateVirtualServerForm from './components/Form';

export default class TemplateVirtualServerEdit extends React.Component {

  render() {
    return (
      <Row>
        <Col xs={10}>
          <TemplateVirtualServerForm />
        </Col>
      </Row>
    );
  }
}

