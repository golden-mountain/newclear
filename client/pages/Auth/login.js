import React from 'react';
// import { Col, Row } from 'react-bootstrap';

import LoginForm from './components/Form';
import PageBase from 'helpers/PageBase';
import pageWrapper from 'helpers/pageWrapper';


class LoginPage extends PageBase {

  render() {
    // console.log(this);
    return (
      <LoginForm />
    );
  }

}

export default pageWrapper(LoginPage);
