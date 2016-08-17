import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form' // imported Field
import { Form, FormGroup, FormControl, ControlLabel, Button, Col, Row, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import Helmet from 'react-helmet';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import JSONTree from 'react-json-tree'
import Inspector from 'react-json-inspector';
import 'react-json-inspector/json-inspector.css';
import JSONEditor from 'components/JSONEditor';

import * as axapiActions from 'redux/modules/axapi';

class MyForm extends Component {
  render() {

    const { handleSubmit, submitting, reset, pristine, request, response } = this.props;

    return (
      <div className="container-fluid">
        <Helmet title="API TESTER"/>
          <Row>
            <Col xs={6}>    	
				<Form onSubmit={handleSubmit(request)} horizontal>
				    <FormGroup controlId="formHorizontalEmail">
				      <Col componentClass={ControlLabel} sm={2}>
				        Session
				      </Col>
				      <Col sm={10}>
						<FormControl.Static>
						{sessionStorage.getItem('token') || 'Need get authentication session first'}
						</FormControl.Static>				      
      				  </Col>
				    </FormGroup>	
				    			
					<FormGroup>
					  <Col componentClass={ControlLabel} sm={2}>Path</Col>
					  <Col sm={10}>
					  	<Field name="path" component="input" type="text" placeholder="path without prefix" className="form-control"/>
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
					  	<Field component={JSONEditor} className="form-control" name="body" />
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
            </Col>
            <Col xs={6}>
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

 InitializeFromStateForm = connect(
  state => ({
  	response: state.axapi.response,
    initialValues: {
      path: '/axapi/v3/auth',
      method: 'POST',
      body: {credentials: {username: 'admin', password: 'a10'}}
    }
  }),
  dispatch => bindActionCreators(axapiActions, dispatch)
)(InitializeFromStateForm);

export default InitializeFromStateForm;