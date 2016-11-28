
import React, { Component } from 'React';
import A10Field from 'components/Field';
import A10Form from 'components/Form/A10Form';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';
import { Row, Col } from 'react-bootstrap';


class VirtualServerForm extends Component {
  render() {
    return (
      <A10Form schema="slb-template-virtual-server" horizontal>
        <Row>
          <Col xs={12} md={12} lg={6}>
            <A10Field name="virtual-server.name" label="Name" value="default" />
            <A10Field name="virtual-server.conn-limit" label="Conn Limit" value="8000000" />
            <A10Field name="virtual-server.conn-limit-reset" label="Conn Limit Reset" />
            <A10Field name="virtual-server.conn-limit-no-logging" label="Conn Limit No Logging" />
            <A10Field name="virtual-server.conn-rate-limit" label="Conn Rate Limit" />
            <A10Field name="virtual-server.rate-interval" label="Rate Interval" value="second" />
            <A10Field name="virtual-server.conn-rate-limit-reset" label="Conn Rate Limit Reset" />
            <A10Field name="virtual-server.conn-rate-limit-no-logging" label="Conn Rate Limit No Logging" />
            <A10Field name="virtual-server.icmp-rate-limit" label="Icmp Rate Limit" />
            <A10Field name="virtual-server.icmp-lockup" label="Icmp Lockup" />
            <A10Field name="virtual-server.icmp-lockup-period" label="Icmp Lockup Period" />
            <A10Field name="virtual-server.icmpv6-rate-limit" label="Icmpv 6 Rate Limit" />
            <A10Field name="virtual-server.icmpv6-lockup" label="Icmpv 6 Lockup" />
            <A10Field name="virtual-server.icmpv6-lockup-period" label="Icmpv 6 Lockup Period" />
            <A10Field name="virtual-server.subnet-gratuitous-arp" label="Subnet Gratuitous Arp" />
          </Col>
        </Row>
        <A10SubmitButtons {...this.props}/>
      </A10Form>
    );
  }
}

export default widgetWrapper()(VirtualServerForm);
