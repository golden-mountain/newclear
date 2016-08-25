import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form/immutable' // imported Field
import { Form, FormGroup, FormControl, ControlLabel, Button, Col, Row, ButtonToolbar, ButtonGroup, Panel } from 'react-bootstrap';
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

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  // console.log(input);
  return <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
}

class MyForm extends Component {

  setHistoryQuery(historyData) {
    const dateReg = /^\d{4}.*:\d{2}$/;
    if (dateReg.test(historyData['key'])) {
      this.props.initialize(historyData.value.data);
    }
    return false;
  }

  clearHistoryQuery() {
    localStorage.removeItem('axapi');
    this.props.initialize(initialValues);
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

  render() {
    const { handleSubmit, submitting, reset, pristine, request, response } = this.props;
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
                <Form onSubmit={handleSubmit(request)} horizontal>
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
                      <Field name="path" component={renderField} type="text" placeholder="path without prefix" className="form-control"/>
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Method</Col>
                    <Col sm={10}>
                      <Field component="select" name="method" className="form-control">
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PUT">PUT</option>
                      </Field>
                    </Col>
                    <FormControl.Feedback />
                  </FormGroup>

          
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Body</Col>
                    <Col sm={10}>
                      <Field component={JSONEditor} className="form-control" name="body"  />
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

let InitializeFromStateForm = reduxForm({
    form: 'apiTester'
  }
 )(MyForm);

function mapStateToProps(state) {
  // return Object.assign(
  //     {},
  //     state.pto.toJS(),
  //     state.app.toJS()
  // );
  // console.log(state.getIn(['axapi']), 'axapi response' );
  return {
    response: state.getIn(['axapi', 'response']),
    initialValues: initialValues
  };
}

function mapDispatchToProps(dispatch) {
    return Object.assign(
        {},
        bindActionCreators(axapiActions, dispatch),
        // bindActionCreators(mainActions, dispatch),
        // bindActionCreators(appActions, dispatch)
    );
}

InitializeFromStateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(InitializeFromStateForm);

export default InitializeFromStateForm;