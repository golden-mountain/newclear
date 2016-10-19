import React from 'react';
import { Col, Row } from 'react-bootstrap';

import AppManager from 'helpers/AppManager';
// import Base from 'pages/Base';
import VirtualServerTable from './components/Table';

export default class VirtualServerList extends React.Component {
 
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

export default AppManager({
  page: 'virtual-server-list'
})(VirtualServerList);


