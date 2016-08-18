import React, {Component, PropTypes} from 'react';
import { withRouter } from 'react-router';
import auth from 'helpers/auth';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as axapiActions from 'redux/modules/axapi';
import { reduxForm, Field } from 'redux-form' // imported Field
import { Form, FormGroup, FormControl, ControlLabel, Button, Col, Row, ButtonToolbar, ButtonGroup } from 'react-bootstrap';

class LoginPage extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.response && nextProps.response.authresponse.signature) {
      const { location } = this.props
      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/')
      }
      return false;
    }
    return true;
  }

  handleSubmit(values) {
    // console.log(values);
    const fullAuthData = {
      path: '/axapi/v3/auth',
      method: "POST", 
      body: values
    }
    return this.props.request(fullAuthData);
  }

  render() {
    const { handleSubmit, submitting, reset, pristine, request, response } = this.props;
    // console.log(this.props);
    return (
      <div className="container-fluid">    
        <Form onSubmit={handleSubmit(::this.handleSubmit)} horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Username</Col>
            <Col sm={10}>
              <Field name="credentials.username" component="input" type="text" placeholder="User name" className="form-control"/>
            </Col>
          </FormGroup>
                     
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Password</Col>
            <Col sm={10}>
              <Field name="credentials.password" component="input" type="text" placeholder="Password" className="form-control"/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <ButtonToolbar>
                <ButtonGroup bsSize="large">
                  <Button type="submit" disabled={submitting} bsStyle="success">
                    {submitting ? <i/> : <i/>} Login
                  </Button>
                  <Button type="button" disabled={pristine || submitting} onClick={reset}>
                    Reset
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
              </Col>
          </FormGroup>
        </Form>

      </div> 
    )
  }

}


let InitializeFromStateForm = reduxForm({
    form: 'login'
  }
 )(LoginPage);

InitializeFromStateForm = connect(
  (state) => ({
    response: state.axapi.response,
  }),
  (dispatch) => bindActionCreators(axapiActions, dispatch)
)(InitializeFromStateForm);

export default withRouter(InitializeFromStateForm);
