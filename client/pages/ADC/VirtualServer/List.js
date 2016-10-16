import React from 'react';
import { Col, Row } from 'react-bootstrap';

import A10Table from 'components/List/A10Table';
import BasePage from 'pages/BasePage';
import AppManager from 'helpers/AppManager';

import slbVirtualServerSchema from 'schemas/slb-virtual-server.json';

class VirtualServerList extends BasePage {
 

  render() {
    const fieldMap = {

    };

    const actions = {

    };

    const options = {

    };

    return (
      <Row>
        <Col xs={12}>
          <A10Table fieldMap={fieldMap} actions={actions} options={options} schema={slbVirtualServerSchema} />
        </Col>
      </Row>
    );
  }
}

export default AppManager({
  page: 'virtual-server-list'
})(VirtualServerList);

