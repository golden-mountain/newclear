import React, { PropTypes } from 'react';
import { Col, Row } from 'react-bootstrap';

import VirtualServerTable from './components/Table';

export default class VirtualServerList extends React.Component {
  static contextTypes = {
    props: PropTypes.object.isRequired
  }
  
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

