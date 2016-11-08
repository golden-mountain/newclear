import React from 'react';
import { Col, Row } from 'react-bootstrap';

// import ApiTesterForm from './components/Form';
import PageBase from 'helpers/PageBase';
import configApp from 'configs/app';
const OEM = configApp.OEM;
const StandardPageLayout = require('oem/' + OEM + '/PageLayout').default;

// test components loading
import NotEditableCom from './components/NotEditableCom';
import EditableCom from './components/EditableCom';
// import slbVirtualServerSchema from 'schemas/slb-virtual-server.json';

export default class Sandbox extends PageBase {
  render() {
    // const { handleSubmit,  ...rest } = this.props; // eslint-disable-line
    const metaWithEndpoint = {
      endpoint: '/axapi/v3/slb/virtual-server/vs2', // pre
      name: 'slb.virtual-server.name'
    };

    // const myRequire = (schema) => {
    //   return require('schemas/' + schema + '.json');
    // };

    const metaWithSchema = {
      schema: 'slb-virtual-server.port-list',
      name: 'port-number',
      urlParams: {
        'name': 'vs2',
        'port-number': 80,
        'protocol': 'http'
      }
    };

    // const testSchema = {
    //   schema: myRequire('slb-virtual-service'),
    //   name: 'slb.virtual-server.port.port-number'
    // };
    //
    // console.log(metaWithSchema, testSchema);

    return (
      <Row>
        <Col xs={12}>
          <StandardPageLayout title="Sandbox" description="Sandbox Page">
            <div>
              <h3> not editable component </h3>
              <NotEditableCom meta={metaWithEndpoint}/>
              <h3> Editable component </h3>
              <EditableCom meta={metaWithSchema}/>
            </div>
          </StandardPageLayout>
        </Col>
      </Row>
    );
  }
}
