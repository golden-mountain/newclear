import React from 'react';
// import { FieldArray } from 'redux-form/immutable'; // imported Field
import { Col, Row, Panel, Radio, Checkbox, FormControl } from 'react-bootstrap';
// import { isEqual } from 'lodash';
import { fromJS, Map } from 'immutable';
// import { SubmissionError } from 'redux-form';
// import A10Button from 'components/Form/A10Button';
import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';
import { A10SchemaField } from 'components/Form/A10Field';
import A10Form from 'components/Form/A10Form';
import A10MultiField from 'components/Form/A10MultiField';
import FormManager from 'helpers/FormManager';
import BaseForm from 'pages/BaseForm';

// import * as logger from 'helpers/logger';
import { isInt } from 'helpers/validations';
import slbVirtualServerSchema from 'schemas/slb-virtual-server.json';

import VirtualPortForm from 'pages/ADC/VirtualPort/components/Form';
import TemplateVirtualServerForm from 'pages/ADC/Templates/VirtualServer/components/Form';

const makeError = (status=true, errMsg='') => ( status ? '' : errMsg );

const ipv4 = (value) => {
  const reg = /^(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$/;
  return makeError(reg.test(value), 'IPv4 Required');
};

class VirtualServerForm extends BaseForm {
  addLine() {
    const valuePath = [ 'values', 'virtual-server', 'port-list' ];
    let list = this.props.pageForm.getIn(valuePath, Map()).toJS();
    list.push({
      'port-number': 91,
      'range': '92',
      'protocol': 'tcp'
    });
    this.props.change('virtual-server.port-list', list);
  }

  handleSubmit(v) {
    let values = fromJS(v);
    const pathWildcard = [ 'x', 'virtual-server','wildcard' ];
    if (values.hasIn(pathWildcard) && values.getIn(pathWildcard) === true
       && values.getIn([ 'x', 'virtual-server', 'address-type' ]) === '0') {
      return {
        'virtual-server': {
          'ip-address': '0.0.0.0',
          'netmask': '/24'
        }
      };
    }

    return {};
  }


  render() {
    const { handleSubmit,  ...rest } = this.props; // eslint-disable-line
    const elements = slbVirtualServerSchema.properties;
    const tplVirtualServerPopupInfo = {
      pageClass: TemplateVirtualServerForm,
      title: 'Create Virtual Server Template',
      pageName: 'templateVirtualServer',
      bsSize:'lg',
      connectOptions: {
        connectToResult: {
          'virtual-server': {
            'template-virtual-server': 'virtual-server.name'
          }
        }
      }
    };

    const tplVirtualServerLoadOptions = {
      url: elements['template-virtual-server']['$ref'],
      loadOnMount: true,
      map: {
        name: 'name',
        label: 'name',
        reform: label => label
      }
    };

    let popupInfo = {
      pageClass: VirtualPortForm,
      urlKeysConnect: [ 'virtual-server.name' ],
      title: 'Create Virtual Port',
      pageName: 'virtualPort',
      bsSize:'lg',
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

    return (
        <Row>
          <Col xs={10}>
              <A10Form onBeforeSubmit={::this.handleSubmit} schemas={[ slbVirtualServerSchema ]} edit={false} horizontal>
                <Row>
                  <Col xs={12}>
                    <Panel header={<h4>Basic Field</h4>} collapsible defaultExpanded>
                      <A10SchemaField schema={elements['name']} name="virtual-server.name" label="Name" value="vs2" />


                      <A10SchemaField  name="x.virtual-server.wildcard" label="Wildcard" value={true}>
                        <Checkbox value={true} />
                      </A10SchemaField>

                      <A10SchemaField name="x.virtual-server.address-type" label="Address Type" value="0" conditional={{ 'x.virtual-server.wildcard': false }}>
                        <div>
                          <Radio value="0" inline> IPv4 </Radio>
                          <Radio value="1" inline> IPv6 </Radio>
                        </div>
                      </A10SchemaField>

                      <A10SchemaField schema={elements['ip-address']} name="virtual-server.ip-address" label="IPv4 Address" validation={{ ipv4: ipv4 }} conditional={{ 'x.virtual-server.address-type': '0' }} />

                      <A10SchemaField schema={elements['netmask']} name="virtual-server.netmask" label="Netmask"  conditional={{ 'x.virtual-server.address-type': '0' }} />

                      <A10SchemaField schema={elements['ipv6-address']} name="virtual-server.ipv6-address" label="IPv6 Address"  conditional={{ 'x.virtual-server.address-type': '1' }} />
                      <A10SchemaField schema={elements['ipv6-acl']} name="virtual-server.ipv6-acl" label="IPv6 ACL" />

                    </Panel>

                    <Panel header={<h4>Advanced Fields</h4>} collapsible defaultExpanded>

                      <A10SchemaField schema={elements['arp-disable']} name="virtual-server.arp-disable" label="Disable ARP" value={false}>
                        <Checkbox value={true} />
                      </A10SchemaField>

                      <A10SchemaField schema={elements['stats-data-action']} name="virtual-server.stats-data-action" label="Stats Data Action" value="stats-data-enable">
                        <div>
                          <Radio value="stats-data-enable" inline> Enable </Radio>
                          <Radio value="stats-data-disable" inline> Disable </Radio>
                        </div>
                      </A10SchemaField>

                      <A10SchemaField schema={elements['extended-stats']} name="virtual-server.extended-stats" label="Extended Stats" value={false}>
                        <Checkbox value={true} />
                      </A10SchemaField>

                      <A10SchemaField schema={elements['redistribution-flagged']} name="virtual-server.redistribution-flagged" label="Redistribution Flagged" value={false}>
                        <Checkbox value={true} />
                      </A10SchemaField>

                      <A10SchemaField
                        schema={elements['vrid']}
                        name="virtual-server.vrid"
                        label="VRID"
                        description="Join a VRRP group (Specify a VRRP-A vrid)"
                        placeholder="Enter vrid."
                        conditional={true}
                      />
                      <A10SchemaField schema={elements['template-virtual-server']} name="virtual-server.template-virtual-server" label="Virtual Server Template" conditional={true} widgetProps={ { popupInfo: tplVirtualServerPopupInfo, loadOptions: tplVirtualServerLoadOptions } } />
                      <A10SchemaField schema={elements['template-logging']} name="virtual-server.template-logging" label="Policy Template" conditional={true}  />
                      <A10SchemaField schema={elements['template-scaleout']} name="virtual-server.template-scaleout" label="Scaleout Template" conditional={true} />

                      <A10SchemaField schema={elements['description']} name="virtual-server.description" label="Description" />
                    </Panel>
                  {/*</Col>

                  <Col xs={6}>*/}
                    <Panel collapsible defaultExpanded header={<h4>Virtual Ports</h4>}>
                      <A10MultiField name="virtual-server.port-list" popupInfo={popupInfo}>
                        <A10SchemaField layout={false} name="port-number" validation={{ isInt: isInt }} title="Port Number" />
                        <A10SchemaField layout={false} name="range"  conditional={{ 'port-number': 91 }} title="Port Range" />

                        <A10SchemaField layout={false} name="protocol" title="Protocol" >
                          <FormControl componentClass="select">
                            <option value="tcp">tcp</option>
                            <option value="udp">udp</option>
                          </FormControl>
                        </A10SchemaField>

                      </A10MultiField>
                    </Panel>
                  </Col>
                </Row>

                <A10SubmitButtons {...rest}/>

              </A10Form>
          </Col>
        </Row>
    );
  }
}


const initialValues = {
  'virtual-server': {
    'name': 'vs',
    'netmask': '/24',
    'port-list': [
      {
        'port-number': 80,
        'range': '80-100',
        'protocol': 'HTTP'
      },
      {
        'port-number': 81,
        'range': '80-101',
        'protocol': 'HTTPS'
      }
    ]
  },
  'x': {
    'virtual-server': {
      'address-type': '0',
      'wildcard': false
    }
  }
};

const InitializeFromStateForm = FormManager({
  page: 'virtualServer',
  form: 'virtualServerForm',
  initialValues: initialValues
})(VirtualServerForm);

export default InitializeFromStateForm;
