import React from 'react';
import { Col, Row } from 'react-bootstrap';

// import BasePage from 'pages/BasePage';
import AppManager from 'helpers/AppManager';
import LoginForm from './components/Form';

export default class LoginPage extends React.Component {
 
  render() {
    
    return (
      <Row>
        <Col xs={12}>
          <LoginForm />
        </Col>
      </Row>
    );
  }

}

const InitializedPage = AppManager({
  page: 'login'
})(LoginPage);


export default InitializedPage;
