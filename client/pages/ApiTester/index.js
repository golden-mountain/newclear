import React, { Component } from 'react'
import { Field, Form, actions } from 'react-redux-form';
import { FormGroup, FormControl, ControlLabel, Button, Col, Row, ButtonToolbar, ButtonGroup, Panel } from 'react-bootstrap';
import Helmet from 'react-helmet';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import JSONTree from 'react-json-tree'
import Inspector from 'react-json-inspector';
import 'react-json-inspector/json-inspector.css';
import JSONEditor from 'components/JSONEditor';
import Immutable from 'immutable';

import * as axapiActions from 'redux/modules/axapi';

const initialValues = {
  path: '/axapi/v3/auth',
  method: 'POST',
  body: {credentials: {username: 'admin', password: 'a10'}}
};


class AXAPIForm extends Component {

  setHistoryQuery(historyData) {
    // console.log(this.props);
    const dateReg = /^\d{4}.*:\d{2}$/;
    if (dateReg.test(historyData['key'])) {
      // console.log(historyData.value.data);
      this.props.load('api', historyData.value.data);
      // this.props.initialize(historyData.value.data);
    }
    return false;
  }

  clearHistoryQuery() {
    localStorage.removeItem('axapi');
    this.props.load('api', initialValues);
    // this.props.initialize(initialValues);
  }

  initSession() {
    this.props.request(initialValues);
  }

  fetchHistory() {
    const historyData = JSON.parse(localStorage.getItem('axapi')) || [];
    let result = {};
    historyData.forEach((value, index) => {
      const path = value.body.data.path.replace('/axapi/v3/', '');
      if (!result[path]) {
        result[path] = [] ;
      }
      result[path][value['at']] = value['body'];
    });
    return result;
  }

  handleSubmit(values) {
    // console.log(this.props);
    // Do whatever you like in here.
    // You can use actions such as:
    this.props.request(values);
    // etc.
  }

  render() {
    const { request, submitting, pristine, response, reset } = this.props;
    const historyData = this.fetchHistory();
    // console.log(this.props);
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
                <Form className="form-horizontal" model="api" onSubmit={(values) => this.handleSubmit(values)}>
                  <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                      Session
                    </Col>
                    <Col sm={10}>
                      <FormControl.Static>
                      {sessionStorage.getItem('token') } 
                      <Button onClick={::this.initSession} bsSize="small" >Init Session</Button> 
                      </FormControl.Static>             
                    </Col>
                  </FormGroup>  
                        
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Path</Col>
                    <Col sm={10}>
                      <Field model="api.path">
                        <input type="text" className="form-control" />
                      </Field>                    
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Method</Col>
                    <Col sm={10}>
                      <Field model="api.method">
                        <select >
                          <option value="GET">GET</option>
                          <option value="POST">POST</option>
                          <option value="DELETE">DELETE</option>
                          <option value="PUT">PUT</option>
                        </select>
                      </Field>
                    </Col>
                    <FormControl.Feedback />
                  </FormGroup>

          
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Body</Col>
                    <Col sm={10} >
                      <JSONEditor model="api.body" values={initialValues.body} ></JSONEditor>
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
                          <Button type="button" disabled={pristine || submitting} onClick={() => reset('api')}>
                            Reset
                          </Button>
                        </ButtonGroup>
                      </ButtonToolbar>
                      </Col>
                  </FormGroup>
                </Form>
              </Panel>
            </Col>
            <Col xs={5}>
              <h4>Current Result </h4>
              <Inspector data={response || {}} />              
            </Col>
          </Row>
      </div>      
    )
  }
}

// let InitializeFromStateForm = reduxForm({
//     form: 'apiTester'
//   }
//  )(AXAPIForm);

function mapStateToProps(state) {
  // console.log(state);
  return {
    response: state.axapi.get('response'),
    api: state.api
    // initialValues: initialValues
  };
}

function mapDispatchToProps(dispatch, ownProps) {
    return Object.assign(
        {},
        // ownProps,
        bindActionCreators(axapiActions, dispatch),
        bindActionCreators(actions, dispatch),
        // bindActionCreators(appActions, dispatch)
    );
}

const InitializeFromStateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AXAPIForm);

export default InitializeFromStateForm;