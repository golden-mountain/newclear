
import React, { Component } from 'React';
import A10Field from 'components/Field';
import A10Form from 'components/Form/A10Form';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';
import { Col, Row, FormControl } from 'react-bootstrap';

class LoggingForm extends Component {

  render() {
    return (
      <A10Form schema="slb-template-logging" horizontal>
        <Row>
          <Col>
            <A10Field name="logging.name" name="Name" />
            <A10Field name="logging.format" name="Format" />
            <A10Field name="logging.local-logging" name="Local Logging" name="0" />
            <A10Field name="logging.service-group" name="Service Group" />
            <A10Field name="logging.pcre-mask" name="Pcre Mask" />
            <A10Field name="logging.mask" name="Mask" name="X" />
            <A10Field name="logging.keep-end" name="Keep End" name="0" />
            <A10Field name="logging.keep-start" name="Keep Start" name="0" />
            <A10Field name="logging.template" name="Template" />
            <A10Field name="logging.tcp-proxy" name="Tcp Proxy" name="default" />
            <A10Field name="logging.source-nat" name="Source Nat" />
            <A10Field name="logging.pool" name="Pool" />
            <A10Field name="logging.auto" name="Auto" name="auto">
              <div>
                <FormControl componentClass="select">
                  <option value="auto">{'Configure auto NAT for logging, default is auto enabled'}</option>
                </FormControl>
              </div>
            </A10Field>
          </Col>
        </Row>
        <A10SubmitButtons {...this.props}/>
      </A10Form>
    );
  }
}
export default widgetWrapper()(LoggingForm);
