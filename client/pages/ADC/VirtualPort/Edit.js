import React from 'react';

import { Col, Row } from 'react-bootstrap';

import VirtualPortForm from 'pages/ADC/VirtualPort/components/Form';
import AppManager from 'helpers/AppManager';
import BasePage from 'pages/BasePage';

class VirtualPortEdit extends BasePage {
  render() {
    // const { handleSubmit,  ...rest } = this.props; // eslint-disable-line

    return (
      <Row>
        <Col xs={10}>
          <VirtualPortForm />
        </Col>
      </Row>
    );
  }
}


const InitializeFromStatePage = AppManager({
  page: 'virtualPort',
  form: 'virtualPortForm'
})(VirtualPortEdit);

export default InitializeFromStatePage;
