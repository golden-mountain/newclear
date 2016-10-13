import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

import ApiTesterForm from './components/Form';
import AppManager from 'helpers/AppManager';

class ApiTester extends Component {
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


const InitializeFromStatePage = AppManager({
  page: 'apiTester'
})(ApiTester);

export default InitializeFromStatePage;
