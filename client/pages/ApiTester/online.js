import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form' // imported Field
import { FormGroup, FormControl, ControlLabel, Button, Col, Row, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import Helmet from 'react-helmet';

const renderInput = field =>
  <div>
    <input {...field.input}/>
    {field.touched &&
     field.error &&
     <span className="error">{field.error}</span>}
  </div>

class MyForm extends Component {
  render() {

    const { handleSubmit, submitting, resetForm } = this.props;

    return (
      <div className="container-fluid">
        <Helmet title="API TESTER"/>
          <Row>
            <Col xs={6}>    	
							<form onSubmit={handleSubmit}>
								<FormGroup>
								  <label className="control-label">Path</label>
								  <Field name="path" component="input" type="text" placeholder="path without prefix" className="form-control"/>
								</FormGroup>
								<FormGroup>
								  <ControlLabel>Method</ControlLabel>
								  <Field component="select" name="method" >
								    <option value="GET">GET</option>
								    <option value="POST">POST</option>
								    <option value="DELETE">DELETE</option>
								    <option value="PUT">PUT</option>
								  </Field>
								  <FormControl.Feedback />
								</FormGroup>
								<FormGroup>
								  <ControlLabel>Body</ControlLabel>
								  <Field component="textarea" name="body" rows={10}/>
								  <FormControl.Feedback />
								</FormGroup>

								<FormGroup>
								  <ButtonToolbar>
								    <ButtonGroup bsSize="large">
								      <Button type="submit" disabled={submitting} bsStyle="primary">
								        {submitting ? <i/> : <i/>} Request
								      </Button>
								      <Button type="button" disabled={submitting} onClick={resetForm}>
								        Reset
								      </Button>
								    </ButtonGroup>
								  </ButtonToolbar>
								</FormGroup>
							</form>
            </Col>
            <Col xs={6}>
              
            </Col>
          </Row>
      </div>      
    )
  }
}

export default reduxForm({
  form: 'myForm'
})(MyForm)