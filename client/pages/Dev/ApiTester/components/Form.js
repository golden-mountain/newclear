import React, { PropTypes } from 'react';
// import { A10Field } from 'redux-form/immutable'; // imported Field
import { FormGroup, FormControl, ControlLabel, Button, Col, Row, ButtonToolbar, ButtonGroup, Panel } from 'react-bootstrap';
import Helmet from 'react-helmet';

import Inspector from 'react-json-inspector';
import 'react-json-inspector/json-inspector.css';
// import JSONEditor from 'components/JSONEditor';

import auth from 'helpers/auth';
// import { widgetWrapper } from 'helpers/widgetWrapper';
import { A10Field, A10Form, A10JSONEditor, widgetWrapper } from 'a10-widget';

// import A10Field from 'components/Field';
// import A10Form from 'components/Form/A10Form';

const initialValues = {
  path: '/axapi/v3/auth',
  method: 'POST',
  body: { credentials: { username: 'admin', password: 'a10' } }
};

class AxapiForm extends React.Component {
  static displayName = 'AxapiForm'

  static contextTypes = {
    props: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  state = { sessionId: auth.getToken() }

  setHistoryQuery(historyData) {
    const dateReg = /^\d{4}.*:\d{2}$/;
    if (dateReg.test(historyData['key'])) {
      this.context.props.initialize(historyData.value.data);
    }
    return false;
  }

  clearHistoryQuery() {
    localStorage.removeItem('axapi');
    this.context.props.initialize(initialValues);
    this.forceUpdate();
  }

  initSession() {
    const promise = this.context.props.axapiRequest(initialValues);
    promise.then(() => {
      this.setState({ sessionId: auth.getToken() });
    });
  }

  fetchHistory() {
    const historyData = JSON.parse(localStorage.getItem('axapi')) || [];
    let result = {};
    historyData.forEach((value) => {
      const path = value.body.data.path.replace('/axapi/v3/', '');
      if (!result[path]) {
        result[path] = [] ;
      }
      result[path][value['at']] = value['body'];
    });
    return result;
  }

  render() {
    // console.log(this);
    const { submitting, reset, pristine } = this.props;
    const { axapiResponse } = this.context.props;
    const historyData = this.fetchHistory();
    // console.log(axapiResponse);
    // console.log(this.context, '>>>>>>>>>>>>>props');
    return (
      <div className="container-fluid">
        <Helmet title="API TESTER"/>
          <Row>
            <Col xs={2}>
              <h4>Request History </h4>
              <Inspector data={historyData || {}} onClick={::this.setHistoryQuery} />
              <Button onClick={::this.clearHistoryQuery} >Clear</Button>
            </Col>
            <Col xs={5}>
              <h4>Request </h4>
              <Panel>
                <A10Form endpoint="/axapi/v3/auth" horizontal>
                  <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                      Session
                    </Col>
                    <Col sm={10}>
                  <FormControl.Static>
                  { this.state.sessionId }
                  <Button onClick={::this.initSession} bsSize="small" >Init Session</Button>
                  </FormControl.Static>
                      </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Path</Col>
                    <Col sm={10}>
                      <A10Field name="path" placeholder="path without prefix" className="form-control"/>
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Method</Col>
                    <Col sm={10}>
                      <A10Field name="method" className="form-control">
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PUT">PUT</option>
                      </A10Field>
                    </Col>
                    <FormControl.Feedback />
                  </FormGroup>


                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Body</Col>
                    <Col sm={10}>
                      <A10Field className="form-control" name="body" >
                        <A10JSONEditor />
                      </A10Field>
                    </Col>
                    <FormControl.Feedback />
                  </FormGroup>

                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <ButtonToolbar>
                        <ButtonGroup bsSize="large">
                          <Button type="submit" disabled={submitting} bsStyle="success">
                            {submitting ? <i/> : <i/>} Request
                          </Button>
                          <Button type="button" disabled={pristine || submitting} onClick={reset}>
                            Reset
                          </Button>
                        </ButtonGroup>
                      </ButtonToolbar>
                      </Col>
                  </FormGroup>
                </A10Form>
              </Panel>
            </Col>
            <Col xs={5}>
              <h4>Current Result </h4>
              <Inspector data={axapiResponse && axapiResponse.toJS() || {}} />
            </Col>
          </Row>
      </div>
    );
  }
}

export default widgetWrapper()(AxapiForm);
