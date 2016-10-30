import React from 'react';
import { Col, Row, Panel, FormControl } from 'react-bootstrap';

import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';
import { A10Field, A10SchemaField } from 'components/Form/A10Field';
import A10Form from 'components/Form/A10Form';
import { widgetWrapper } from 'helpers/widgetWrapper';

import slbVirtualPortSchema from 'schemas/slb-virtual-service.json';

class VirtualPort extends React.Component {
  static displayName = 'VirtualPort'

  render() {
    const { handleSubmit,  ...rest } = this.props; // eslint-disable-line
    const elements = slbVirtualPortSchema.properties;
    // console.log(this.props, this.context);
    const urlKeys = { 'name': 'vs2' };
    return (
      <A10Form schemas={[ slbVirtualPortSchema ]} edit={false} urlKeys={urlKeys} horizontal>
        <Row>
          <Col xs={12}>
            <Panel header={<h4>Basic Field</h4>}>
              <A10SchemaField schema={elements['port-number']} name="port.port-number" label="Port" />

              <A10SchemaField schema={elements['protocol']} name="port.protocol" component={A10Field} label="Port Protocol" conditional={true} value="udp" >
                <FormControl componentClass="select">
                  <option value="tcp">tcp</option>
                  <option value="udp">udp</option>
                </FormControl>
              </A10SchemaField>

            </Panel>
          </Col>

        </Row>

        <A10SubmitButtons {...rest}/>

      </A10Form>

    );
  }
}

export default widgetWrapper()(VirtualPort);
