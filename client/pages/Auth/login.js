import React from 'react';
import { Col, Row } from 'react-bootstrap';

import LoginForm from './components/Form';

export default class LoginPage extends React.Component {
 
  render() {
    // console.log(this);
    return (
      <Row>
        <Col xs={12}>
          <LoginForm />
        </Col>
      </Row>
    );
  }

}
