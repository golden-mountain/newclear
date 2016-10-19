import React from 'react';

import { Col, Row } from 'react-bootstrap';

import VirtualPortForm from 'pages/ADC/VirtualPort/components/Form';
import AppManager from 'helpers/AppManager';


export default class VirtualPortEdit extends React.Component {


  render() {

    return (
      <Row>
        <Col xs={10}>
          <VirtualPortForm />
        </Col>
      </Row>
    );
  }
}


const InitializedPage = AppManager({
  page: 'virtualPort'
})(VirtualPortEdit);

export default InitializedPage;
