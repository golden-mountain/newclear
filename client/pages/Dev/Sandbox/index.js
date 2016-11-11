import React from 'react';
import { Col, Row } from 'react-bootstrap';

// import ApiTesterForm from './components/Form';
import PageBase from 'helpers/PageBase';
import configApp from 'configs/app';
const OEM = configApp.OEM;
const StandardPageLayout = require('oem/' + OEM + '/PageLayout').default;

// test components loading
import ContainerWidget from './components/ContainerWidget';
import NotEditableCom from './components/NotEditableCom';
import EditableCom from './components/EditableCom';
import FieldCheckbox from './components/FieldCheckbox';
// import slbVirtualServerSchema from 'schemas/slb-virtual-server.json';

export default class Sandbox extends PageBase {
  render() {
    // const myRequire = (schema) => {
    //   return require('schemas/' + schema + '.json');
    // };
    const urlParams = {
      'name': 'vs2',
      'port-number': 80,
      'protocol': 'http'
    };

    const metaWithSchema = {
      // schema: 'slb-virtual-server.port-list',
      name: 'virtual-server.port.port-number'
      // initial: '80'
      // loadInitial: true,
      // urlParams
    };

    // const { handleSubmit,  ...rest } = this.props; // eslint-disable-line
    const metaWithEndpoint = {
      // endpoint: '/axapi/v3/slb/virtual-server/vs2', // pre
      name: 'virtual-server.name'
    };

    const containerSchema = {
      schema: 'slb-virtual-server',
      name: 'virtual-server.description',
      initial: 'test description',
      loadInitial: true,
      urlParams
    };

    const objectSchema = {
      // schema: slbVirtualServerSchema,
      name: 'virtual-server.netmask'
      // initial: '/24',
      // loadInitial: true,
      // urlParams
    };

    const noSchemaData = {
      name: 'virtual-server.ip-address'
      // initial: '192.168.4.4',
      // loadInitial: true
    };

    // console.log(metaWithSchema, containerSchema);

    return (
      <Row>
        <Col xs={12}>
          <StandardPageLayout title="Sandbox" description="Sandbox Page">
            <ContainerWidget meta={containerSchema}>
              <h3> Not editable component </h3>
              <NotEditableCom meta={metaWithEndpoint}/>
              <h3> Editable component </h3>
              <EditableCom meta={metaWithSchema} title="Port"/>
              <EditableCom meta={noSchemaData} title="IP Address"/>
              <EditableCom meta={objectSchema} title="Netmask" />
            </ContainerWidget>

            <ContainerWidget meta={containerSchema}>
              <h3> ADC Virtual Server Form Demo </h3>
              <EditableCom urlParams={urlParams} title="Name" name="virtual-server.name" invalid />
              <FieldCheckbox title="Wildcard" name="x.wildcard" value={false} />
              <FieldCheckbox title="IPv6 Type" name="x.ipAddressType" conditional={{ 'x.wildcard': false }}  value={true} />
              <EditableCom name="virtual-server.ip-address" conditional={{ 'x.ipAddressType': false }}  title="IP Address"/>
              <EditableCom name="virtual-server.netmask" conditional={{ 'x.ipAddressType': false }} title="Netmask" />
              <EditableCom name="virtual-server.ipv6-address" conditional={{ 'x.ipAddressType': true }}  title="IPv6 Address"/>
            </ContainerWidget>
          </StandardPageLayout>
        </Col>
      </Row>
    );
  }
}
