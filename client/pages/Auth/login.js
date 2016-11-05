import React from 'react';
// import { Col, Row } from 'react-bootstrap';

import LoginForm from './components/Form';
import PageBase from 'helpers/PageBase';
import configApp from 'configs/app';
const OEM = configApp.OEM;
const LoginPageLayout = require('oem/' + OEM + '/LoginLayout').default;

export default class LoginPage extends PageBase {

  render() {
    // console.log(this);
    return (
      <LoginPageLayout>
        <LoginForm />
      </LoginPageLayout>
    );
  }

}
