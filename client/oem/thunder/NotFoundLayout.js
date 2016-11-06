import React from 'react';
// import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import configApp from 'configs/app';
const OEM = configApp.OEM;
const NotFoundLayout = require('oem/' + OEM + '/NotFoundLayout').default;


class NotFound extends React.Component {

  render() {
    return (<NotFoundLayout />);
  }

}

export default NotFound;

