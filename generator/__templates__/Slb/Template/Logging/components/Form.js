
import React, { Component } from 'React';
import A10Field from 'components/Field';
import A10Form from 'components/Form/A10Form';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';
import { Row, Col } from 'react-bootstrap';


class LoggingForm extends Component {
  render() {
    return (
      <A10Form schema="slb-template-logging" horizontal>
        <Row>
          <Col xs={12} md={12} lg={6}>
            <A10Field name="logging.name" label="Name" />
            <A10Field name="logging.format" label="Format" />
            <A10Field name="logging.local-logging" label="Local Logging" value="0" />
            <A10Field name="logging.service-group" label="Service Group" />
            <A10Field name="logging.pcre-mask" label="Pcre Mask" />
            <A10Field name="logging.mask" label="Mask" value="X" />
            <A10Field name="logging.keep-end" label="Keep End" value="0" />
            <A10Field name="logging.keep-start" label="Keep Start" value="0" />
            <A10Field name="logging.template" label="Template" />
            <A10Field name="logging.tcp-proxy" label="Tcp Proxy" value="default" />
            <A10Field name="logging.source-nat" label="Source Nat" />
            <A10Field name="logging.pool" label="Pool" />
            <A10Field name="logging.auto" label="Auto" value="auto" />
          </Col>
        </Row>
        <A10SubmitButtons {...this.props}/>
      </A10Form>
    );
  }
}

export default widgetWrapper()(LoggingForm);
