import React, {Component, PropTypes} from 'react';
import { withRouter } from 'react-router';
import auth from 'helpers/auth';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as axapiActions from 'redux/modules/axapi';
import { Field, Form, actions } from 'react-redux-form';
// import { reduxForm, Field } from 'redux-form/immutable' // imported Field
import { FormGroup, FormControl, ControlLabel, Button, Col, Row, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
// import Immutable from 'immutable';

class LoginPage extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  shouldComponentUpdate(nextProps) {
    // console.log(nextProps);
    // return true; 
    if (nextProps.response && nextProps.response.authresponse &&  nextProps.response.authresponse.signature) {
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
        
        <Form className="form-horizontal" model="api" onSubmit={(values) => this.handleSubmit(values)}>
                         
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Username</Col>
            <Col sm={10}>
              <Field model="api.credentials.username">
                <input type="text"  className="form-control"  />
              </Field>                   
            </Col>
          </FormGroup>          

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Password</Col>
            <Col sm={10}>
              <Field model="api.credentials.password">
                <input type="text" className="form-control" />
              </Field>                   
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


let InitializeFromStateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default withRouter(InitializeFromStateForm);
