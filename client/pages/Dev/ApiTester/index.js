import React from 'react';
import { Col, Row } from 'react-bootstrap';

import ApiTesterForm from './components/Form';
// import PageBase from 'helpers/PageBase';
// import { widgetWrapper } from 'a10-widget';

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
