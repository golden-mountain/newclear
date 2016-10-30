import React from 'react';
import { Col, Row } from 'react-bootstrap';

import ApiTesterForm from './components/Form';
import PageBase from 'helpers/PageBase';

export default class ApiTester extends PageBase {
  render() {
    // const { handleSubmit,  ...rest } = this.props; // eslint-disable-line

    return (
      <Row>
        <Col xs={12}>
          <ApiTesterForm />
        </Col>
      </Row>
    );
  }
}

