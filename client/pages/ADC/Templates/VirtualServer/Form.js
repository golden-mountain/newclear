import React from 'react';
// import { FieldArray } from 'redux-form/immutable'; // imported Field
import { Col, Row, Panel } from 'react-bootstrap';
import Helmet from 'react-helmet';
// import { isEqual } from 'lodash';
// import { Map, fromJS } from 'immutable';
// import { SubmissionError } from 'redux-form';
import { A10FieldSubmit } from 'components/Form/A10Button';
import { A10Field, A10SchemaField } from 'components/Form/A10Field';
import A10Form from 'components/Form/A10Form';

import AppManager from 'helpers/AppManager';
import BaseForm from 'pages/BaseForm';

// import * as logger from 'helpers/logger';
// import { isInt } from 'helpers/validations';
import slbTemplateVirtualServerSchema from 'schemas/slb-template-virtual-server.json';

class TemplateVirtualServerForm extends BaseForm {
 
  render() {
    const { handleSubmit,  ...rest } = this.props; // eslint-disable-line
    const elements = slbTemplateVirtualServerSchema.properties;

    return (
      <div className="container-fluid">
        <Helmet title="Edit Template Virtual Server"/>
        <Row>
         
          <Col xs={12}>                   
              <A10Form schemas={[ slbTemplateVirtualServerSchema ]} edit={false}  horizontal>
                <Row>
                  <Col xs={12}>
                    <Panel header={<h4>Basic Field</h4>}>
                      <A10SchemaField schema={elements['name']} name="virtual-server.name" component={A10Field} label="Name" />    
                      <A10SchemaField schema={elements['conn-limit']} name="virtual-server.conn-limit" component={A10Field} label="Connection Limit" />
                    </Panel> 
                  </Col>

                </Row>

                <A10FieldSubmit {...rest}/>

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
  page: 'templateVirtualServer',
  form: 'templateVirtualServerForm', 
  initialValues: initialValues
})(TemplateVirtualServerForm);

export default InitializeFromStateForm;
