
import React, { Component } from 'React';
import A10Field from 'components/Field';
import A10Form from 'components/Form/A10Form';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';
import { Row, Col } from 'react-bootstrap';


class PortForm extends Component {
  render() {
    return (
      <A10Form schema="slb-virtual-service" horizontal>
        <Row>
          <Col xs={12} md={12} lg={6}>
            <A10Field name="port.port-number" label="Port Number" />
            <A10Field name="port.protocol" label="Protocol" />
            <A10Field name="port.range" label="Range" value="0" />
            <A10Field name="port.alternate-port" label="Alternate Port" />
            <A10Field name="port.name" label="Name" />
            <A10Field name="port.conn-limit" label="Conn Limit" value="8000000" />
            <A10Field name="port.reset" label="Reset" />
            <A10Field name="port.no-logging" label="No Logging" />
            <A10Field name="port.use-alternate-port" label="Use Alternate Port" />
            <A10Field name="port.alternate-port-number" label="Alternate Port Number" />
            <A10Field name="port.alt-protocol1" label="Alt Protocol 1" />
            <A10Field name="port.serv-sel-fail" label="Serv Sel Fail" />
            <A10Field name="port.when-down" label="When Down" />
            <A10Field name="port.alt-protocol2" label="Alt Protocol 2" />
            <A10Field name="port.req-fail" label="Req Fail" />
            <A10Field name="port.when-down-protocol2" label="When Down Protocol 2" />
            <A10Field name="port.action" label="Action" value="enable" />
            <A10Field name="port.l7-service-chain" label="L 7 Service Chain" />
            <A10Field name="port.def-selection-if-pref-failed" label="Def Selection If Pref Failed" value="def-selection-if-pref-failed" />
            <A10Field name="port.ha-conn-mirror" label="Ha Conn Mirror" />
            <A10Field name="port.on-syn" label="On Syn" />
            <A10Field name="port.skip-rev-hash" label="Skip Rev Hash" />
            <A10Field name="port.message-switching" label="Message Switching" />
            <A10Field name="port.force-routing-mode" label="Force Routing Mode" />
            <A10Field name="port.reset-on-server-selection-fail" label="Reset On Server Selection Fail" />
            <A10Field name="port.clientip-sticky-nat" label="Clientip Sticky Nat" />
            <A10Field name="port.extended-stats" label="Extended Stats" />
            <A10Field name="port.gslb-enable" label="Gslb Enable" />
            <A10Field name="port.view" label="View" />
            <A10Field name="port.snat-on-vip" label="Snat On Vip" />
            <A10Field name="port.stats-data-action" label="Stats Data Action" value="stats-data-enable" />
            <A10Field name="port.syn-cookie" label="Syn Cookie" />
            <A10Field name="port.expand" label="Expand" />
            <A10Field name="port.access-list" label="Access List" />
            <A10Field name="port.acl-id-list" label="Acl Id List" />
            <A10Field name="port.acl-name-list" label="Acl Name List" />
            <A10Field name="port.aflex-scripts" label="Aflex Scripts" />
            <A10Field name="port.no-auto-up-on-aflex" label="No Auto Up On Aflex" />
            <A10Field name="port.enable-scaleout" label="Enable Scaleout" />
            <A10Field name="port.scaleout-bucket-count" label="Scaleout Bucket Count" value="32" />
            <A10Field name="port.scaleout-device-group" label="Scaleout Device Group" />
            <A10Field name="port.source-nat" label="Source Nat" />
            <A10Field name="port.pool" label="Pool" />
            <A10Field name="port.auto" label="Auto" />
            <A10Field name="port.precedence" label="Precedence" />
            <A10Field name="port.use-cgnv6" label="Use Cgnv 6" />
            <A10Field name="port.enable-playerid-check" label="Enable Playerid Check" />
            <A10Field name="port.service-group" label="Service Group" />
            <A10Field name="port.ipinip" label="Ipinip" />
            <A10Field name="port.ip-map-list" label="Ip Map List" />
            <A10Field name="port.rtp-sip-call-id-match" label="Rtp Sip Call Id Match" />
            <A10Field name="port.use-rcv-hop-for-resp" label="Use Rcv Hop For Resp" />
            <A10Field name="port.persist-type" label="Persist Type" />
            <A10Field name="port.l2-redirect-fwd" label="L 2 Redirect Fwd" />
            <A10Field name="port.eth-fwd" label="Eth Fwd" />
            <A10Field name="port.trunk-fwd" label="Trunk Fwd" />
            <A10Field name="port.l2-redirect-rev" label="L 2 Redirect Rev" />
            <A10Field name="port.eth-rev" label="Eth Rev" />
            <A10Field name="port.trunk-rev" label="Trunk Rev" />
            <A10Field name="port.template" label="Template" />
            <A10Field name="port.template-sip" label="Template Sip" />
            <A10Field name="port.template-smpp" label="Template Smpp" />
            <A10Field name="port.template-dblb" label="Template Dblb" />
            <A10Field name="port.template-connection-reuse" label="Template Connection Reuse" />
            <A10Field name="port.template-dns" label="Template Dns" />
            <A10Field name="port.template-policy" label="Template Policy" />
            <A10Field name="port.template-dynamic-service" label="Template Dynamic Service" />
            <A10Field name="port.persist" label="Persist" />
            <A10Field name="port.template-persist-source-ip" label="Template Persist Source Ip" />
            <A10Field name="port.template-persist-destination-ip" label="Template Persist Destination Ip" />
            <A10Field name="port.template-persist-ssl-sid" label="Template Persist Ssl Sid" />
            <A10Field name="port.template-persist-cookie" label="Template Persist Cookie" />
            <A10Field name="port.template-imap-pop3" label="Template Imap Pop 3" />
            <A10Field name="port.template-smtp" label="Template Smtp" />
            <A10Field name="port.template-http" label="Template Http" />
            <A10Field name="port.template-http-policy" label="Template Http Policy" />
            <A10Field name="port.redirect-to-https" label="Redirect To Https" />
            <A10Field name="port.template-external-service" label="Template External Service" />
            <A10Field name="port.template-reqmod-icap" label="Template Reqmod Icap" />
            <A10Field name="port.template-respmod-icap" label="Template Respmod Icap" />
            <A10Field name="port.template-server-ssl" label="Template Server Ssl" />
            <A10Field name="port.template-client-ssl" label="Template Client Ssl" />
            <A10Field name="port.template-udp" label="Template Udp" value="default" />
            <A10Field name="port.template-tcp" label="Template Tcp" value="default" />
            <A10Field name="port.template-virtual-port" label="Template Virtual Port" value="default" />
            <A10Field name="port.template-ftp" label="Template Ftp" />
            <A10Field name="port.template-diameter" label="Template Diameter" />
            <A10Field name="port.template-cache" label="Template Cache" />
            <A10Field name="port.template-fix" label="Template Fix" />
            <A10Field name="port.waf-template" label="Waf Template" />
            <A10Field name="port.template-ssli" label="Template Ssli" />
            <A10Field name="port.tcp-proxy" label="Tcp Proxy" value="default" />
            <A10Field name="port.template-tcp-proxy-client" label="Template Tcp Proxy Client" />
            <A10Field name="port.template-tcp-proxy-server" label="Template Tcp Proxy Server" />
            <A10Field name="port.template-tcp-proxy" label="Template Tcp Proxy" />
            <A10Field name="port.use-default-if-no-server" label="Use Default If No Server" />
            <A10Field name="port.template-scaleout" label="Template Scaleout" />
            <A10Field name="port.no-dest-nat" label="No Dest Nat" />
            <A10Field name="port.port-translation" label="Port Translation" />
            <A10Field name="port.l7-hardware-assist" label="L 7 Hardware Assist" />
            <A10Field name="port.auth-cfg" label="Auth Cfg" />
          </Col>
        </Row>
        <A10SubmitButtons {...this.props}/>
      </A10Form>
    );
  }
}

export default widgetWrapper()(PortForm);
