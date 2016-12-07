
import React, { Component } from 'React';
import A10Field from 'components/Field';
import A10Form from 'components/Form/A10Form';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';
import { Col, Row, FormControl } from 'react-bootstrap';

class VirtualServerForm extends Component {

  render() {
    return (
      <A10Form schema="slb-template-virtual-server" horizontal>
        <Row>
          <Col>
            <A10Field name="virtual-server.name" name="Name" name="default" />
            <A10Field name="virtual-server.conn-limit" name="Conn Limit" name="8000000" />
            <A10Field name="virtual-server.conn-limit-reset" name="Conn Limit Reset" />
            <A10Field name="virtual-server.conn-limit-no-logging" name="Conn Limit No Logging" />
            <A10Field name="virtual-server.conn-rate-limit" name="Conn Rate Limit" />
            <A10Field name="virtual-server.rate-interval" name="Rate Interval" name="second">
              <div>
                <FormControl componentClass="select">
                  <option value="100ms">{'Use 100 ms as sampling interval'}</option>
                  <option value="second">{'Use 1 second as sampling interval'}</option>
                </FormControl>
              </div>
            </A10Field>
            <A10Field name="virtual-server.conn-rate-limit-reset" name="Conn Rate Limit Reset" />
            <A10Field name="virtual-server.conn-rate-limit-no-logging" name="Conn Rate Limit No Logging" />
            <A10Field name="virtual-server.icmp-rate-limit" name="Icmp Rate Limit" />
            <A10Field name="virtual-server.icmp-lockup" name="Icmp Lockup" />
            <A10Field name="virtual-server.icmp-lockup-period" name="Icmp Lockup Period" />
            <A10Field name="virtual-server.icmpv6-rate-limit" name="Icmpv 6 Rate Limit" />
            <A10Field name="virtual-server.icmpv6-lockup" name="Icmpv 6 Lockup" />
            <A10Field name="virtual-server.icmpv6-lockup-period" name="Icmpv 6 Lockup Period" />
            <A10Field name="virtual-server.subnet-gratuitous-arp" name="Subnet Gratuitous Arp" />
          </Col>
        </Row>
        <A10SubmitButtons {...this.props}/>
      </A10Form>
    );
  }
}
export default widgetWrapper()(VirtualServerForm);
