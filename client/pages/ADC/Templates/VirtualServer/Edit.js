import React from 'react';

import { Col, Row } from 'react-bootstrap';

import TemplateVirtualServerForm from 'pages/ADC/Templates/VirtualServer/components/Form';
import AppManager from 'helpers/AppManager';
// import BasePage from 'pages/BasePage';

export default class TemplateVirtualServerEdit extends React.Component {

  render() {
    // const { handleSubmit,  ...rest } = this.props; // eslint-disable-line
    return (
      <Row>
        <Col xs={10}>
          <TemplateVirtualServerForm />
        </Col>
      </Row>
    );
  }
}


const InitializedPage = AppManager({
  page: 'teamplateVirtualServer'
})(TemplateVirtualServerEdit);

export default InitializedPage;
