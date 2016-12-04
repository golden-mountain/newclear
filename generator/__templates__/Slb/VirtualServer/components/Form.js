
import React, { Component } from 'React';
import A10Field from 'components/Field';
import A10Form from 'components/Form/A10Form';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';
import { Col, Row, FormControl } from 'react-bootstrap';

class VirtualServerForm extends Component {

  render() {
    return (
      <A10Form schema="slb-virtual-server" horizontal>
        <Row>
          <Col>
            <A10Field name="virtual-server.name" name="Name" />
            <A10Field name="virtual-server.ipv6-address" name="Ipv 6 Address" />
            <A10Field name="virtual-server.ip-address" name="Ip Address" />
            <A10Field name="virtual-server.netmask" name="Netmask" />
            <A10Field name="virtual-server.ipv6-acl" name="Ipv 6 Acl" />
            <A10Field name="virtual-server.acl" name="Acl" />
            <A10Field name="virtual-server.acl-id" name="Acl Id" />
            <A10Field name="virtual-server.acl-name" name="Acl Name" />
            <A10Field name="virtual-server.use-if-ip" name="Use If Ip" />
            <A10Field name="virtual-server.ethernet" name="Ethernet" />
            <A10Field name="virtual-server.description" name="Description" />
            <A10Field name="virtual-server.enable-disable-action" name="Enable Disable Action" name="enable">
              <div>
                <FormControl componentClass="select">
                  <option value="enable">{'Enable Virtual Server (default)'}</option>
                  <option value="disable">{'Disable Virtual Server'}</option>
                  <option value="disable-when-all-ports-down">{'Disable Virtual Server when all member ports are down'}</option>
                  <option value="disable-when-any-port-down">{'Disable Virtual Server when any member port is down'}</option>
                </FormControl>
              </div>
            </A10Field>
            <A10Field name="virtual-server.redistribution-flagged" name="Redistribution Flagged" />
            <A10Field name="virtual-server.arp-disable" name="Arp Disable" />
            <A10Field name="virtual-server.template" name="Template" />
            <A10Field name="virtual-server.template-policy" name="Template Policy" />
            <A10Field name="virtual-server.template-virtual-server" name="Template Virtual Server" />
            <A10Field name="virtual-server.template-logging" name="Template Logging" />
            <A10Field name="virtual-server.template-scaleout" name="Template Scaleout" />
            <A10Field name="virtual-server.stats-data-action" name="Stats Data Action" name="stats-data-enable">
              <div>
                <FormControl componentClass="select">
                  <option value="stats-data-enable">{'Enable statistical data collection for virtual server'}</option>
                  <option value="stats-data-disable">{'Disable statistical data collection for virtual server'}</option>
                </FormControl>
              </div>
            </A10Field>
            <A10Field name="virtual-server.extended-stats" name="Extended Stats" />
            <A10Field name="virtual-server.vrid" name="Vrid" />
            <A10Field name="virtual-server.port-list" name="Port List" />
          </Col>
        </Row>
        <A10SubmitButtons {...this.props}/>
      </A10Form>
    );
  }
}
export default widgetWrapper()(VirtualServerForm);
