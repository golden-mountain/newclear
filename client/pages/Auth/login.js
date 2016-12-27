import React from 'react';
// import { Col, Row } from 'react-bootstrap';

import LoginForm from './components/Form';
// import PageBase from 'helpers/PageBase';
// import pageWrapper from 'helpers/pageWrapper';
import { widgetWrapper } from 'a10-widget';


class LoginPage extends React.Component {

  static displayName = 'loginPage'

  render() {
    // console.log(this);
    return (
      <LoginForm />
    );
  }

}

export default widgetWrapper([ 'app' ])(LoginPage);
