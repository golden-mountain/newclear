import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form/immutable' // imported Field
import { Form, FormGroup, FormControl, ControlLabel, Button, Col, Row, ButtonToolbar, ButtonGroup, Panel, Checkbox, Radio } from 'react-bootstrap';
import Helmet from 'react-helmet';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as axapiActions from 'redux/modules/axapi';
import _ from 'lodash';
// import Immutable from 'immutable';

class VirtualServerForm extends Component {

  handleSubmit(values) {
    // console.log(values);
    _.unset(values, 'x');
    if (_.has(values, 'virtual-server.wildcard')) {
      _.unset(values, 'virtual-server.wildcard');
      values['virtual-server']['ip-address'] = '0.0.0.0';
      values['virtual-server']['netmask'] = '/0';
    }

    const fullAuthData = {
      path: '/axapi/v3/slb/virtual-server/',
      method: "POST", 
      body: values
    }
    return this.props.request(fullAuthData);
  }


  render() {
    const { handleSubmit, submitting, reset, pristine, request, response } = this.props;

    return (
      <div className="container-fluid">
        <Helmet title="Edit Virtual Server"/>
          <Row>
            <Col xs={2}>
              <h4>Help  </h4>

            </Col>
            <Col xs={10}>   
              <h4>Basic Field </h4>   
              <Panel>
                <Form onSubmit={handleSubmit(::this.handleSubmit)} horizontal>

                          
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Name</Col>
                    <Col sm={10}>
                      <Field name="virtual-server.name" component="input" type="text" placeholder="" className="form-control"/>
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Wildcard</Col>
                    <Col sm={10}>
                      <Field component="input" type="checkbox" name="virtual-server.wildcard" />
                    </Col>
                    <FormControl.Feedback />
                  </FormGroup>

          
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Address Type</Col>
                    <Col sm={10}>
                      <Field name="x.virtual-server.address-type" component="input" type="radio" value="0" /> IPv4
                      <Field name="x.virtual-server.address-type" component="input" type="radio" value="1" /> IPv6
                    </Col>
                    <FormControl.Feedback />
                  </FormGroup>

                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Address</Col>
                    <Col sm={10}>
                      <Field component="input" type="text" name="virtual-server.ip-address" className="form-control" />
                    </Col>
                    <FormControl.Feedback />
                  </FormGroup>

                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Netmask</Col>
                    <Col sm={10}>
                      <Field component="input" type="text" name="virtual-server.netmask" className="form-control" />
                    </Col>
                    <FormControl.Feedback />
                  </FormGroup>

                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <ButtonToolbar>
                        <ButtonGroup bsSize="large">
                          <Button type="submit" disabled={submitting} bsStyle="success">
                            {submitting ? <i/> : <i/>} Create
                          </Button>
                          <Button type="button" disabled={pristine || submitting} >
                            Cancel
                          </Button>
                        </ButtonGroup>
                      </ButtonToolbar>
                      </Col>
                  </FormGroup>
                </Form>
              </Panel>
            </Col>
          </Row>
      </div>      
    )
  }
}

let InitializeFromStateForm = reduxForm({
    form: 'virtualServerForm'
  }
 )(VirtualServerForm);


const initialValues = {};

function mapStateToProps(state) {
  // return Object.assign(
  //     {},
  //     state.pto.toJS(),
  //     state.app.toJS()
  // );
  return {
    response: state.getIn(['axapi','response']),
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