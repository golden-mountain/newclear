import React, { PropTypes } from 'react';
import { A10MultiField } from '../../../src/widgets/A10Field/FieldWidgets';

import { Col, Row, Panel, FormControl, Checkbox } from 'react-bootstrap';
import { A10SubmitButtons } from '../../../../client/components/Form/A10SubmitButtons';

// import slbVirtualServerSchema from '../../../../schemas/slb-virtual-server.json';
import { A10Field, A10Form, widgetWrapper } from 'widgetWrapper';

import slbVirtualPortSchema from '../../../../schemas/slb-virtual-server.json';

class VirtualPort extends React.Component {
  static displayName = 'VirtualPort'

  render() {
    const { handleSubmit,  ...rest } = this.props; // eslint-disable-line
    // const elements = slbVirtualPortSchema.properties;
    // console.log(this.props);
    const urlKeys = { 'name': 'vs2' };
    return (
      <A10Form schema={ slbVirtualPortSchema } urlKeys={urlKeys} horizontal>
        <Row>
          <Col xs={12}>
            <Panel header={<h4>Basic Field</h4>}>
              <A10Field name="port.name" label="Name" />
              <A10Field name="port.port-number" label="Port" />
              <A10Field name="port.protocol" label="Port Protocol" value="udp" >
                <FormControl componentClass="select">
                  <option value="tcp">tcp</option>
                  <option value="udp">udp</option>
                </FormControl>
              </A10Field>
              <A10Field name="port.alternate-port" label="Alternate Port" >
                <Checkbox value={true} />
              </A10Field>
              <A10Field name="port.range" label="Range" />
              <A10Field name="port.conn-limit" label="Connection Limit" />
              <A10Field name="port.reset" label="Reset" >
                <Checkbox value={true} />
              </A10Field>
              <A10Field name="port.no-logging" label="No Logging" >
                <Checkbox value={true} />
              </A10Field>
              <A10Field name="port.action" label="Action" />
              <A10Field name="port.service-group" label="Service Group" />
            </Panel>
          </Col>

        </Row>
        <A10SubmitButtons {...rest}/>
      </A10Form>
    );
  }
}

const MyVirtualPort = widgetWrapper()(VirtualPort);

function MyA10MultiField({ ...props }) {
  let newProps = {};
  Object.keys(A10MultiField.propTypes).forEach((key)=>{
    newProps[key] = props[key];
  });
  return (
    <div style={ { position: 'relative' } }>
      {props.children}
      <A10MultiField {...newProps} name={props.objName}>
        {props.fields}
      </A10MultiField>
    </div>
  );
}

export default widgetWrapper()(MyA10MultiField, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Field',
      name: 'A10MultiField',
      component: 'A10MultiField',
      display: 'block',
      isContainer: false,
      description: ''
    },
    defaultProps: {
      fields: [],
      objName: 'virtual-server.port-list',
      popupInfo: {
        componentClass: MyVirtualPort,
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
      }
    },
    propTypes: Object.assign({}, A10MultiField.propTypes, {
      fields: PropTypes.array.isRequired,
      objName: PropTypes.string.isRequired
    }),
    propGroups: {
      fields: 'basic',
      objName: 'basic'
    }
  }
});
