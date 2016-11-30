
import React from 'react';

import { Col, Row, Panel } from 'react-bootstrap';

import { A10Field, A10SchemaField } from 'components/Form/A10Field';
import A10Form from 'components/Form/A10Form';

import AppManager from 'helpers/AppManager';
import BaseForm from 'pages/BaseForm';

import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';

import slbTemplateLoggingSchema from 'slb-template-logging.json';


class SlbTemplateLoggingForm extends BaseForm {

  render() {

    const elements = slbTemplateLoggingSchema.properties;
    const panelFields = (
      <Panel header={<h4>Basic Field</h4>}>

        <A10SchemaField
          schema={elements['name']}
          name="logging.name"
          component={A10Field}
          label="Name"
        />

        <A10SchemaField
          schema={elements['format']}
          name="logging.format"
          component={A10Field}
          label="Format"
        />

        <A10SchemaField
          schema={elements['local-logging']}
          name="logging.local-logging"
          component={A10Field}
          label="Local Logging"
        />

        <A10SchemaField
          schema={elements['service-group']}
          name="logging.service-group"
          component={A10Field}
          label="Service Group"
        />

        <A10SchemaField
          schema={elements['pcre-mask']}
          name="logging.pcre-mask"
          component={A10Field}
          label="PCRE Mask"
        />

        <A10SchemaField
          schema={elements['mask']}
          name="logging.mask"
          component={A10Field}
          label="Mask"
        />

        <A10SchemaField
          schema={elements['keep-start']}
          name="logging.keep-start"
          component={A10Field}
          label="Keep Start"
        />

        <A10SchemaField
          schema={elements['keep-end']}
          name="logging.keep-end"
          component={A10Field}
          label="Keep End"
        />

      </Panel>
    );

    return (
      <A10Form schemas={[ slbTemplateLoggingSchema ]} edit={false}  horizontal>
        <Row>
          <Col xs={12}>
            {panelFields}
          </Col>
        </Row>
        <A10SubmitButtons />
      </A10Form>
    );
  }
}


const initialValues = {
};

const InitializeFromStateForm = AppManager({
  page: 'slbTemplateLogging',
  form: 'slbTemplateLoggingForm',
  initialValues: initialValues
})(SlbTemplateLoggingForm);

export default InitializeFromStateForm;
