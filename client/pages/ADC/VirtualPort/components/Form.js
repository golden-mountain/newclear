import React from 'react';
// import { FieldArray } from 'redux-form/immutable'; // imported Field
import { Col, Row, Panel, FormControl, Checkbox } from 'react-bootstrap';
// import Helmet from 'react-helmet';
// import { isEqual } from 'lodash';
// import { Map, fromJS } from 'immutable';
// import { SubmissionError } from 'redux-form';
import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';
import { A10Field, A10SchemaField } from 'components/Form/A10Field';
import A10Form from 'components/Form/A10Form';

import FormManager from 'helpers/FormManager';
import BaseForm from 'pages/BaseForm';

// import * as logger from 'helpers/logger';
// import { isInt } from 'helpers/validations';
import slbVirtualPortSchema from 'schemas/slb-virtual-service.json';

class VirtualPort extends BaseForm {

  render() {
    const { handleSubmit,  ...rest } = this.props; // eslint-disable-line
    const elements = slbVirtualPortSchema.properties;

    const urlKeys = { 'name': 'vs2' };
    return (
      <A10Form schemas={[ slbVirtualPortSchema ]} edit={false} urlKeys={urlKeys} horizontal>
        <Row>
          <Col xs={12}>
            <Panel header={<h4>Basic Field</h4>}>
              <A10SchemaField schema={elements['name']} name="port.name" label="Name" />
              <A10SchemaField schema={elements['protocol']} name="port.protocol" component={A10Field} label="Port Protocol" conditional={true} value="udp" >
                <FormControl componentClass="select">
                  <option value="tcp">tcp</option>
                  <option value="udp">udp</option>
                </FormControl>
              </A10SchemaField>
              <A10SchemaField schema={elements['port-number']} name="port.port-number" label="Port" />
              <A10SchemaField schema={elements['alternate-port']} name="port.alternate-port" label="Alternate Port" >
                <Checkbox value={true} />
              </A10SchemaField>
              <A10SchemaField schema={elements['range']} name="port.range" label="Range" />
              <A10SchemaField schema={elements['conn-limit']} name="port.conn-limit" label="Connection Limit" />
              <A10SchemaField schema={elements['reset']} name="port.reset" label="Reset" >
                <Checkbox value={true} />
              </A10SchemaField>
              <A10SchemaField schema={elements['no-logging']} name="port.no-logging" label="No Logging" >
                <Checkbox value={true} />
              </A10SchemaField>
              <A10SchemaField schema={elements['action']} name="port.action" label="Action" />
              <A10SchemaField schema={elements['service-group']} name="port.service-group" label="Service Group" />
            </Panel>
          </Col>

        </Row>
        <A10SubmitButtons {...rest}/>
      </A10Form>
    );
  }
}


const initialValues = {
};

const InitializeFromStateForm = FormManager({
  page: 'virtualPort',
  initialValues: initialValues
})(VirtualPort);

export default InitializeFromStateForm;
