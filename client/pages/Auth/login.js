import React from 'react';
// import { Col, Row } from 'react-bootstrap';

import LoginForm from './components/Form';
import PageBase from 'helpers/PageBase';


export default class LoginPage extends PageBase {

  render() {
    // console.log(this);
    return (
      <LoginForm />
    );
  }

}
