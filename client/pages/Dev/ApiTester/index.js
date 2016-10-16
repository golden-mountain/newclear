import React from 'react';
import { Col, Row } from 'react-bootstrap';

import ApiTesterForm from './components/Form';
// import AppManager from 'helpers/AppManager';
import BasePage from 'pages/BasePage';

export default class ApiTester extends BasePage {
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


// const InitializeFromStatePage = AppManager({
//   page: 'apiTester',
//   form: 'apiTesterForm'
// })(ApiTester);

// export default InitializeFromStatePage;
