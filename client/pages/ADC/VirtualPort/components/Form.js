import React from 'react';
import { Col, Row, Panel, FormControl, Checkbox } from 'react-bootstrap';
import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';
// import A10Field from 'components/Field';
// import A10Form from 'components/Form/A10Form';
// import { widgetWrapper } from 'helpers/widgetWrapper';
import { A10Field, A10Form, widgetWrapper } from 'a10-widget';

import slbVirtualPortSchema from 'slb-virtual-service.json';

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

export default widgetWrapper()(VirtualPort);
