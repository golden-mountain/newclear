import React from 'react';
// import { FieldArray } from 'redux-form/immutable'; // imported Field
import { Col, Row, Panel, FormControl } from 'react-bootstrap';
import Helmet from 'react-helmet';
// import { isEqual } from 'lodash';
// import { Map, fromJS } from 'immutable';
// import { SubmissionError } from 'redux-form';
import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';
import { A10Field, A10SchemaField } from 'components/Form/A10Field';
import A10Form from 'components/Form/A10Form';

import AppManager from 'helpers/AppManager';
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
      <div className="container-fluid">
        <Helmet title="Edit Virtual Port"/>
        <Row>
         
          <Col xs={12}>                   
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
          </Col>
        </Row>
      </div>      
    );
  }
}


const initialValues = {
};

const InitializeFromStateForm = AppManager({
  page: 'virtualPort',
  form: 'virtualPortForm', 
  initialValues: initialValues
})(VirtualPort);

export default InitializeFromStateForm;
