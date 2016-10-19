import React from 'react';

import { Col, Row } from 'react-bootstrap';

import VirtualServerForm from 'pages/ADC/VirtualServer/components/Form';
import AppManager from 'helpers/AppManager';

export default class VirtualServerEdit extends React.Component {
  // env = {
  //   page: 'virtual-server-edit',
  //   form: 'virtual-server-form'
  // }

  render() {

    return (
      <Row>
        <Col xs={2}>
          <h4>Help  </h4>
          {/* <Button onClick={::this.addLine} > Add a Line </Button> */}
        </Col>
        <Col xs={10}>
          <VirtualServerForm />
        </Col>
      </Row>
    );
  }
}


const initialValues = {
  'virtual-server': {
    'name': 'vs',
    'netmask': '/24',
    'port-list': [
      {
        'port-number': 80,
        'range': '80-100',
        'protocol': 'HTTP'
      },
      {
        'port-number': 81,
        'range': '80-101',
        'protocol': 'HTTPS'
      }
    ]
  },
  'x': {
    'virtual-server': {
      'address-type': '0',
      'wildcard': false
    }
  }
};

const InitializePage = AppManager({
  page: 'virtual-server-edit',
  initialValues
})(VirtualServerEdit);

export default InitializePage;
