
import React, { Component } from 'React';
import A10Field from 'components/Field';
import A10Form from 'components/Form/A10Form';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';
import { Col, Row, FormControl } from 'react-bootstrap';

class PortForm extends Component {

  render() {
    return (
      <A10Form schema="slb-virtual-service" horizontal>
        <Row>
          <Col>
            <A10Field name="port.port-number" name="Port Number" />
            <A10Field name="port.protocol" name="Protocol">
              <div>
                <FormControl componentClass="select">
                  <option value="tcp">{'TCP LB service'}</option>
                  <option value="udp">{'UDP Port'}</option>
                  <option value="others">{'for no tcp/udp protocol, do IP load balancing'}</option>
                  <option value="diameter">{'diameter port'}</option>
                  <option value="dns-tcp">{'DNS service over TCP'}</option>
                  <option value="dns-udp">{'DNS service over UDP'}</option>
                  <option value="fast-http">{'Fast HTTP Port'}</option>
                  <option value="fix">{'FIX Port'}</option>
                  <option value="ftp">{'File Transfer Protocol Port'}</option>
                  <option value="ftp-proxy">{'ftp proxy port'}</option>
                  <option value="http">{'HTTP Port'}</option>
                  <option value="imap">{'imap proxy port'}</option>
                  <option value="mlb">{'Message based load balancing'}</option>
                  <option value="mms">{'Microsoft Multimedia Service Port'}</option>
                  <option value="mysql">{'mssql port'}</option>
                  <option value="mssql">{'mssql'}</option>
                  <option value="pop3">{'pop3 proxy port'}</option>
                  <option value="radius">{'RADIUS Port'}</option>
                  <option value="rtsp">{'Real Time Streaming Protocol Port'}</option>
                  <option value="sip">{'Session initiation protocol over UDP'}</option>
                  <option value="sip-tcp">{'Session initiation protocol over TCP'}</option>
                  <option value="sips">{'Session initiation protocol over TLS'}</option>
                  <option value="smpp-tcp">{'SMPP service over TCP'}</option>
                  <option value="spdy">{'spdy port'}</option>
                  <option value="spdys">{'spdys port'}</option>
                  <option value="smtp">{'SMTP Port'}</option>
                  <option value="ssl-proxy">{'Generic SSL proxy'}</option>
                  <option value="ssli">{'SSL insight'}</option>
                  <option value="tcp-proxy">{'Generic TCP proxy'}</option>
                  <option value="tftp">{'TFTP Port'}</option>
                </FormControl>
              </div>
            </A10Field>
            <A10Field name="port.range" name="Range" name="0" />
            <A10Field name="port.alternate-port" name="Alternate Port" />
            <A10Field name="port.name" name="Name" />
            <A10Field name="port.conn-limit" name="Conn Limit" name="8000000" />
            <A10Field name="port.reset" name="Reset" />
            <A10Field name="port.no-logging" name="No Logging" />
            <A10Field name="port.use-alternate-port" name="Use Alternate Port" />
            <A10Field name="port.alternate-port-number" name="Alternate Port Number" />
            <A10Field name="port.alt-protocol1" name="Alt Protocol 1">
              <div>
                <FormControl componentClass="select">
                  <option value="http">{'HTTP Port'}</option>
                </FormControl>
              </div>
            </A10Field>
            <A10Field name="port.serv-sel-fail" name="Serv Sel Fail" />
            <A10Field name="port.when-down" name="When Down" />
            <A10Field name="port.alt-protocol2" name="Alt Protocol 2">
              <div>
                <FormControl componentClass="select">
                  <option value="tcp">{'TCP LB service'}</option>
                </FormControl>
              </div>
            </A10Field>
            <A10Field name="port.req-fail" name="Req Fail" />
            <A10Field name="port.when-down-protocol2" name="When Down Protocol 2" />
            <A10Field name="port.action" name="Action" name="enable">
              <div>
                <FormControl componentClass="select">
                  <option value="enable">{'Enable'}</option>
                  <option value="disable">{'Disable'}</option>
                </FormControl>
              </div>
            </A10Field>
            <A10Field name="port.l7-service-chain" name="L 7 Service Chain" />
            <A10Field name="port.def-selection-if-pref-failed" name="Def Selection If Pref Failed" name="def-selection-if-pref-failed">
              <div>
                <FormControl componentClass="select">
                  <option value="def-selection-if-pref-failed">{'Use default server selection method if prefer method failed'}</option>
                  <option value="def-selection-if-pref-failed-disable">{'Stop using default server selection method if prefer method failed'}</option>
                </FormControl>
              </div>
            </A10Field>
            <A10Field name="port.ha-conn-mirror" name="Ha Conn Mirror" />
            <A10Field name="port.on-syn" name="On Syn" />
            <A10Field name="port.skip-rev-hash" name="Skip Rev Hash" />
            <A10Field name="port.message-switching" name="Message Switching" />
            <A10Field name="port.force-routing-mode" name="Force Routing Mode" />
            <A10Field name="port.reset-on-server-selection-fail" name="Reset On Server Selection Fail" />
            <A10Field name="port.clientip-sticky-nat" name="Clientip Sticky Nat" />
            <A10Field name="port.extended-stats" name="Extended Stats" />
            <A10Field name="port.gslb-enable" name="Gslb Enable" />
            <A10Field name="port.view" name="View" />
            <A10Field name="port.snat-on-vip" name="Snat On Vip" />
            <A10Field name="port.stats-data-action" name="Stats Data Action" name="stats-data-enable">
              <div>
                <FormControl componentClass="select">
                  <option value="stats-data-enable">{'Enable statistical data collection for virtual port'}</option>
                  <option value="stats-data-disable">{'Disable statistical data collection for virtual port'}</option>
                </FormControl>
              </div>
            </A10Field>
            <A10Field name="port.syn-cookie" name="Syn Cookie" />
            <A10Field name="port.expand" name="Expand" />
            <A10Field name="port.access-list" name="Access List" />
            <A10Field name="port.acl-id-list" name="Acl Id List" />
            <A10Field name="port.acl-name-list" name="Acl Name List" />
            <A10Field name="port.aflex-scripts" name="Aflex Scripts" />
            <A10Field name="port.no-auto-up-on-aflex" name="No Auto Up On Aflex" />
            <A10Field name="port.enable-scaleout" name="Enable Scaleout" />
            <A10Field name="port.scaleout-bucket-count" name="Scaleout Bucket Count" name="32" />
            <A10Field name="port.scaleout-device-group" name="Scaleout Device Group" />
            <A10Field name="port.source-nat" name="Source Nat" />
            <A10Field name="port.pool" name="Pool" />
            <A10Field name="port.auto" name="Auto" />
            <A10Field name="port.precedence" name="Precedence" />
            <A10Field name="port.use-cgnv6" name="Use Cgnv 6" />
            <A10Field name="port.enable-playerid-check" name="Enable Playerid Check" />
            <A10Field name="port.service-group" name="Service Group" />
            <A10Field name="port.ipinip" name="Ipinip" />
            <A10Field name="port.ip-map-list" name="Ip Map List" />
            <A10Field name="port.rtp-sip-call-id-match" name="Rtp Sip Call Id Match" />
            <A10Field name="port.use-rcv-hop-for-resp" name="Use Rcv Hop For Resp" />
            <A10Field name="port.persist-type" name="Persist Type">
              <div>
                <FormControl componentClass="select">
                  <option value="src-dst-ip-swap-persist">{'Create persist session after source IP and destination IP swap'}</option>
                  <option value="use-src-ip-for-dst-persist">{'Use the source IP to create a destination persist session'}</option>
                  <option value="use-dst-ip-for-src-persist">{'Use the destination IP to create source IP persist session'}</option>
                </FormControl>
              </div>
            </A10Field>
            <A10Field name="port.l2-redirect-fwd" name="L 2 Redirect Fwd" />
            <A10Field name="port.eth-fwd" name="Eth Fwd" />
            <A10Field name="port.trunk-fwd" name="Trunk Fwd" />
            <A10Field name="port.l2-redirect-rev" name="L 2 Redirect Rev" />
            <A10Field name="port.eth-rev" name="Eth Rev" />
            <A10Field name="port.trunk-rev" name="Trunk Rev" />
            <A10Field name="port.template" name="Template" />
            <A10Field name="port.template-sip" name="Template Sip" />
            <A10Field name="port.template-smpp" name="Template Smpp" />
            <A10Field name="port.template-dblb" name="Template Dblb" />
            <A10Field name="port.template-connection-reuse" name="Template Connection Reuse" />
            <A10Field name="port.template-dns" name="Template Dns" />
            <A10Field name="port.template-policy" name="Template Policy" />
            <A10Field name="port.template-dynamic-service" name="Template Dynamic Service" />
            <A10Field name="port.persist" name="Persist" />
            <A10Field name="port.template-persist-source-ip" name="Template Persist Source Ip" />
            <A10Field name="port.template-persist-destination-ip" name="Template Persist Destination Ip" />
            <A10Field name="port.template-persist-ssl-sid" name="Template Persist Ssl Sid" />
            <A10Field name="port.template-persist-cookie" name="Template Persist Cookie" />
            <A10Field name="port.template-imap-pop3" name="Template Imap Pop 3" />
            <A10Field name="port.template-smtp" name="Template Smtp" />
            <A10Field name="port.template-http" name="Template Http" />
            <A10Field name="port.template-http-policy" name="Template Http Policy" />
            <A10Field name="port.redirect-to-https" name="Redirect To Https" />
            <A10Field name="port.template-external-service" name="Template External Service" />
            <A10Field name="port.template-reqmod-icap" name="Template Reqmod Icap" />
            <A10Field name="port.template-respmod-icap" name="Template Respmod Icap" />
            <A10Field name="port.template-server-ssl" name="Template Server Ssl" />
            <A10Field name="port.template-client-ssl" name="Template Client Ssl" />
            <A10Field name="port.template-udp" name="Template Udp" name="default" />
            <A10Field name="port.template-tcp" name="Template Tcp" name="default" />
            <A10Field name="port.template-virtual-port" name="Template Virtual Port" name="default" />
            <A10Field name="port.template-ftp" name="Template Ftp" />
            <A10Field name="port.template-diameter" name="Template Diameter" />
            <A10Field name="port.template-cache" name="Template Cache" />
            <A10Field name="port.template-fix" name="Template Fix" />
            <A10Field name="port.waf-template" name="Waf Template" />
            <A10Field name="port.template-ssli" name="Template Ssli" />
            <A10Field name="port.tcp-proxy" name="Tcp Proxy" name="default" />
            <A10Field name="port.template-tcp-proxy-client" name="Template Tcp Proxy Client" />
            <A10Field name="port.template-tcp-proxy-server" name="Template Tcp Proxy Server" />
            <A10Field name="port.template-tcp-proxy" name="Template Tcp Proxy" />
            <A10Field name="port.use-default-if-no-server" name="Use Default If No Server" />
            <A10Field name="port.template-scaleout" name="Template Scaleout" />
            <A10Field name="port.no-dest-nat" name="No Dest Nat" />
            <A10Field name="port.port-translation" name="Port Translation" />
            <A10Field name="port.l7-hardware-assist" name="L 7 Hardware Assist" />
            <A10Field name="port.auth-cfg" name="Auth Cfg" />
          </Col>
        </Row>
        <A10SubmitButtons {...this.props}/>
      </A10Form>
    );
  }
}
export default widgetWrapper()(PortForm);
