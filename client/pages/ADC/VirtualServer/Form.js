import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form/immutable' // imported Field
import { Form, FormGroup, FormControl, ControlLabel, Button, Col, Row, ButtonToolbar, ButtonGroup, Panel, Checkbox, Radio, HelpBlock } from 'react-bootstrap';
import Helmet from 'react-helmet';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as axapiActions from 'redux/modules/axapi';
// import _ from 'lodash';
import Immutable from 'immutable';
import { SubmissionError } from 'redux-form'


const validate = values => {

  const errors = {
    'virtual-server': {}
  };

  const nameVal = values.getIn(['virtual-server', 'name'], '');
  if (!nameVal) {
    errors['virtual-server']['name'] = 'Required';
  } else if (nameVal.length < 2) {
    errors['virtual-server']['name'] = 'Less than 2 characters';
  }

  return errors;
}

const renderField = (field) => {
  // console.log(field, 'this is a field');
  const {label} = field;
  let status = {}, error = '';
  if (field.touched && field.error) {
    error = <HelpBlock className="error">{field.error}</HelpBlock>;
    status.validationState = 'error';
  }

  return (
    <FormGroup {...status}>
      <Col componentClass={ControlLabel} sm={2}>{label}</Col>
      <Col sm={10}>
        <FormControl type="text" {...field.input}/>
        <FormControl.Feedback />
        { error }
      </Col>
    </FormGroup>
  );

}

class A10Checkbox extends Component {
  // handleChange() {
  //   console.log('changing');
  //   return true;
  // }

  render() {
    const {label, name} = this.props;
    return (
      <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>{label}</Col>
        <Col sm={10}>
          <Field component="input" type="checkbox" name={name}  />
        </Col>
        <FormControl.Feedback />
      </FormGroup>
    );

  }
}


class VirtualServerForm extends Component {

  // validate(values) {
  //   // console.log(values);
  //   throw new SubmissionError({ 'name': 'Wrong Name', _error: 'submit failed!' });
  // }

  filterFields() {

  }

  handleSubmit(v) {
    let values = Immutable.Map(v);
    values = values.delete('x');
    const pathWildcard = ['virtual-server','wildcard'];
    if (values.hasIn(pathWildcard)) {
      values = values.deleteIn(pathWildcard);
      let ip = Immutable.fromJS({
        'virtual-server': {
          'ip-address': '0.0.0.0',
          'netmask': '/24'
        }
      });
      values = values.mergeDeep(ip);
      // values = values.setIn(['virtual-server', 'netmask'], '/0');
    }

    const fullAuthData = {
      path: '/axapi/v3/slb/virtual-server/',
      method: "POST", 
      body: values
    }

    return this.props.request(fullAuthData);
  }


  render() {
    const { handleSubmit, submitting, reset, pristine, request, response, error, switcher } = this.props;
    console.log(switcher.toJS());
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


                  <Field name="virtual-server.name" component={renderField} type="text" placeholder="" className="form-control" label="Name"  />

                  <A10Checkbox name="virtual-server.wildcard" label="Wildcard" />
          
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
    form: 'virtualServerForm',
    validate
  }
 )(VirtualServerForm);


const initialValues = {
  'virtual-server': {
    'name': 'vs1'
  }
};

function mapStateToProps(state) {
  // return Object.assign(
  //     {},
  //     state.pto.toJS(),
  //     state.app.toJS()
  // );
  return {
    response: state.getIn(['axapi','response']),
    switcher: state.getIn(['switcher']),
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