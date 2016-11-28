
import React, { Component } from 'React';
import A10Field from 'components/Field';
import A10Form from 'components/Form/A10Form';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';
import { Row, Col } from 'react-bootstrap';


class VirtualServerForm extends Component {
  render() {
    return (
      <A10Form schema="slb-virtual-server" horizontal>
        <Row>
          <Col xs={12} md={12} lg={6}>
            <A10Field name="virtual-server.name" label="Name" />
            <A10Field name="virtual-server.ipv6-address" label="Ipv 6 Address" />
            <A10Field name="virtual-server.ip-address" label="Ip Address" />
            <A10Field name="virtual-server.netmask" label="Netmask" />
            <A10Field name="virtual-server.ipv6-acl" label="Ipv 6 Acl" />
            <A10Field name="virtual-server.acl" label="Acl" />
            <A10Field name="virtual-server.acl-id" label="Acl Id" />
            <A10Field name="virtual-server.acl-name" label="Acl Name" />
            <A10Field name="virtual-server.use-if-ip" label="Use If Ip" />
            <A10Field name="virtual-server.ethernet" label="Ethernet" />
            <A10Field name="virtual-server.description" label="Description" />
            <A10Field name="virtual-server.enable-disable-action" label="Enable Disable Action" value="enable" />
            <A10Field name="virtual-server.redistribution-flagged" label="Redistribution Flagged" />
            <A10Field name="virtual-server.arp-disable" label="Arp Disable" />
            <A10Field name="virtual-server.template" label="Template" />
            <A10Field name="virtual-server.template-policy" label="Template Policy" />
            <A10Field name="virtual-server.template-virtual-server" label="Template Virtual Server" />
            <A10Field name="virtual-server.template-logging" label="Template Logging" />
            <A10Field name="virtual-server.template-scaleout" label="Template Scaleout" />
            <A10Field name="virtual-server.stats-data-action" label="Stats Data Action" value="stats-data-enable" />
            <A10Field name="virtual-server.extended-stats" label="Extended Stats" />
            <A10Field name="virtual-server.vrid" label="Vrid" />
            <A10Field name="virtual-server.port-list" label="Port List" />
          </Col>
        </Row>
        <A10SubmitButtons {...this.props}/>
      </A10Form>
    );
  }
}

export default widgetWrapper()(VirtualServerForm);
