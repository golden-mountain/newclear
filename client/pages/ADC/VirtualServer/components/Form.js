import React from 'react';
import { Col, Row, Panel, Radio, Checkbox, FormControl } from 'react-bootstrap';
import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';

import { A10Field, A10MultiField, A10Form, widgetWrapper } from 'a10-widget';
// import { isInt } from 'helpers/validations';
import slbVirtualServerSchema from 'slb-virtual-server.json';

import VirtualPortForm from 'pages/ADC/VirtualPort/components/Form';
import TemplateVirtualServerForm from 'pages/ADC/Templates/VirtualServer/components/Form';

// const makeError = (status=true, errMsg='') => ( status ? '' : errMsg );

// const ipv4 = (value) => {
//   const reg = /^(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$/;
//   return makeError(reg.test(value), 'IPv4 Required');
// };

class VirtualServerForm extends React.Component {
  static displayName = 'VirtualServerForm'


  test = () => {
    console.log(this.refs.test.refs.wrappedInstance.model.getValue());
  }

  render() {

    const tplVirtualServerPopupInfo = {
      componentClass: TemplateVirtualServerForm,
      modalProps: {
        title: 'Create Virtual Server Template',
        bsSize:'super'
      },
      connectTo: 'virtual-server.name'
    };

    const tplVirtualServerLoadOptions = {
      // url: elements['template-virtual-server']['$ref'],
      loadOnMount: true,
      params: {
        start:0,
        count:10000
      },
      map: {
        name: 'name',
        label: 'name',
        reform: label => label
      }
    };

    let popupInfo = {
      componentClass: VirtualPortForm,
      // instancePath: this.props.createInstancePath(),
      urlKeysConnect: [ 'virtual-server.name' ],
      modalProps: {
        title: 'Create Virtual Port',
        bsSize:'super'
      },
      connectOptions: {
        connectToValue: {
          'virtual-server.port-list': {
            'port-number': 'port.port-number',
            'range': 'port.range',
            'protocol': 'port.protocol'
          }
        },
        connectToApiStore: {
          targetIsArray: true,
          target: 'virtual-server.port-list',
          source: 'port'
        }
      }
    };

    // const onInitialize = (dataFromAPI) => {
    //   // console.log(dataFromAPI);
    //   const ipv4 = dataFromAPI.getIn([ 'virtual-server', 'ip-address' ], false);
    //   if (ipv4) {
    //     if( ipv4 === '0.0.0.0') {
    //       dataFromAPI = dataFromAPI.setIn([ 'x', 'virtual-server', 'wildcard' ], true);
    //     } else {
    //       dataFromAPI = dataFromAPI.setIn([ 'x', 'virtual-server', 'wildcard' ], false);
    //     }
    //
    //     dataFromAPI = dataFromAPI.setIn([ 'x', 'virtual-server', 'address-type' ], '0');
    //   } else {
    //     dataFromAPI = dataFromAPI.setIn([ 'x', 'virtual-server', 'wildcard' ], false);
    //     dataFromAPI = dataFromAPI.setIn([ 'x', 'virtual-server', 'address-type' ], '1');
    //   }
    //   return dataFromAPI;
    // };

    // const onIpInitialize = (data) => {
    //
    // };
    return (
      <A10Form schema={slbVirtualServerSchema} redirect={{ path: 'list' }} horizontal>
        <Row>
          <Col xs={12} md={12} lg={6}>
            <Panel header={<h4>Basic Field</h4>} collapsible defaultExpanded>
              <A10Field ref="test" name="virtual-server.name" label="Name" />
              <A10Field name="x.virtual-server.wildcard" label="Wildcard" value={false}>
                <Checkbox value={true} />
              </A10Field>

              <A10Field name="x.virtual-server.address-type" label="Address Type" value="0" conditional={{ 'x.virtual-server.wildcard': false }}>
                <div>
                  <Radio value="0" inline> IPv4 </Radio>
                  <Radio value="1" inline> IPv6 </Radio>
                </div>
              </A10Field>

              <A10Field name="virtual-server.ip-address" label="IPv4 Address"  conditional={{ 'x.virtual-server.address-type': '0' }} />

              <A10Field name="virtual-server.netmask" label="Netmask"  conditional={{ 'x.virtual-server.address-type': '0' }} />

              <A10Field name="virtual-server.ipv6-address" label="IPv6 Address" conditional={{ 'x.virtual-server.address-type': '1' }} />
              <A10Field name="virtual-server.ipv6-acl" label="IPv6 ACL" />

            </Panel>
            {/* collapsible */}
            <Panel header={<h4>Virtual Server Advanced Fields</h4>} collapsible >

              <A10Field name="virtual-server.arp-disable" label="Disable ARP" value={false}>
                <Checkbox value={true} />
              </A10Field>

              <A10Field name="virtual-server.stats-data-action" label="Stats Data Action" value="stats-data-enable">
                <div>
                  <Radio value="stats-data-enable" inline> Enable </Radio>
                  <Radio value="stats-data-disable" inline> Disable </Radio>
                </div>
              </A10Field>

              <A10Field name="virtual-server.extended-stats" label="Extended Stats" value={false}>
                <Checkbox value={true} />
              </A10Field>

              <A10Field name="virtual-server.redistribution-flagged" label="Redistribution Flagged" value={false}>
                <Checkbox value={true} />
              </A10Field>

              <A10Field
                name="virtual-server.vrid"
                label="VRID"
                description="Join a VRRP group (Specify a VRRP-A vrid)"
                placeholder="Enter vrid."
              />
              <A10Field name="virtual-server.template-virtual-server" label="Virtual Server Template" conditional={false} widgetProps={ { popupInfo: tplVirtualServerPopupInfo, loadOptions: tplVirtualServerLoadOptions } } />
              <A10Field name="virtual-server.template-logging" label="Policy Template" conditional={false}  />
              <A10Field name="virtual-server.template-scaleout" label="Scaleout Template" conditional={false} />

              <A10Field name="virtual-server.description" label="Description" />
            </Panel>
          </Col>

          <Col xs={12} md={12} lg={6}>
            <Panel collapsible defaultExpanded header={<h4>Virtual Ports</h4>}>
              <A10MultiField name="virtual-server.port-list" popupInfo={popupInfo}>
                <A10Field layout={false} name="port-number" title="Port Number" searchable={true} primary={true} />
                <A10Field layout={false} name="range" title="Port Range" />
                <A10Field layout={false} name="protocol" title="Protocol" >
                  <FormControl componentClass="select" defaultValue="tcp">
                    <option value="tcp">tcp</option>
                    <option value="udp">udp</option>
                  </FormControl>
                </A10Field>
              </A10MultiField>
            </Panel>
          </Col>
        </Row>

        <A10SubmitButtons {...this.props}/>

      </A10Form>
    );
  }
}


export default widgetWrapper()(VirtualServerForm);
