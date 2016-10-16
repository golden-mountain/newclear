import React from 'react';
import { Col, Row } from 'react-bootstrap';

import BasePage from 'pages/BasePage';
// import AppManager from 'helpers/AppManager';
import LoginForm from './components/Form';

export default class LoginPage extends BasePage {
 
  render() {
    const { from } = this.props.location.state || '/';
    
    return (
      <Row>
        <Col xs={12}>
          <LoginForm from={from}/>
        </Col>
      </Row>
    );
  }

}

// const InitializeFromStatePage = AppManager({
//   page: 'login'
// })(LoginPage);


// export default InitializeFromStatePage;
