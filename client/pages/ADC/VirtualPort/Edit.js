import React from 'react';

import { Col, Row } from 'react-bootstrap';

import VirtualPortForm from './components/Form';
import PageBase from 'helpers/PageBase';
import pageWrapper from 'helpers/pageWrapper';

class VirtualPortEdit extends PageBase {


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

export default pageWrapper(VirtualPortEdit);
