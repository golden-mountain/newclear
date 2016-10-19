import React from 'react';
import { Col, Row } from 'react-bootstrap';

import ApiTesterForm from './components/Form';
import AppManager from 'helpers/AppManager';
// import BasePage from 'pages/BasePage';

export default class ApiTester extends React.Component {
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

const initialValues = {
  path: '/axapi/v3/auth',
  method: 'POST',
  body: { credentials: { username: 'admin', password: 'a10' } }
};

const InitializedPage = AppManager({
  page: 'apiTester',
  form: 'apiTesterForm',
  initialValues
})(ApiTester);

export default InitializedPage;
