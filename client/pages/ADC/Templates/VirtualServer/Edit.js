import React from 'react';

import { Col, Row } from 'react-bootstrap';

import TemplateVirtualServerForm from './components/Form';
import PageBase from 'helpers/PageBase';
import pageWrapper from 'helpers/pageWrapper';

class TemplateVirtualServerEdit extends PageBase {

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

export default pageWrapper(TemplateVirtualServerEdit);
