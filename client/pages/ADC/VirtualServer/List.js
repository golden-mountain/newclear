import React from 'react';
import { Col, Row } from 'react-bootstrap';

import VirtualServerTable from './components/Table';
import PageBase from 'helpers/PageBase';
import pageWrapper from 'helpers/pageWrapper';

class VirtualServerList extends PageBase {
  
  
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

export default pageWrapper(VirtualServerList);
