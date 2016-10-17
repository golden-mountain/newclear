import React from 'react';
import { Col, Row } from 'react-bootstrap';

// import A10Table from 'components/List/A10Table';
import BasePage from 'pages/BasePage';
import VirtualServerTable from './components/Table';

export default class VirtualServerList extends BasePage {
 
  render() {    

    return (
      <Row>
        <Col xs={12}>
          <VirtualServerTable  />
        </Col>
      </Row>
    );
  }
}
