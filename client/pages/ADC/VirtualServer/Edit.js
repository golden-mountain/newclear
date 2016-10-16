import React from 'react';

import { Col, Row } from 'react-bootstrap';

import VirtualServerForm from 'pages/ADC/VirtualServer/components/Form';
// import AppManager from 'helpers/AppManager';
import BasePage from 'pages/BasePage';

export default class VirtualServerEdit extends BasePage {
  // env = {
  //   page: 'virtual-server-edit',
  //   form: 'virtual-server-form'
  // }

  render() {
    // const { handleSubmit,  ...rest } = this.props; // eslint-disable-line

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


// const InitializeFromStatePage = AppManager({
//   page: 'virtualServer',
//   form: 'virtualServerForm'
// })(VirtualServerEdit);

// export default InitializeFromStatePage;
