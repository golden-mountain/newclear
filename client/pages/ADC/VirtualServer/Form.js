import React, { Component } from 'react';
import { reduxForm, Field } from 'a10-redux-form/immutable'; // imported Field
import { Form, FormGroup, FormControl, Button, Col, Row, ButtonToolbar, ButtonGroup, Panel, Radio, Checkbox } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as axapiActions from 'redux/modules/axapi';
// import _ from 'lodash';
import Immutable from 'immutable';
// import { SubmissionError } from 'a10-redux-form';
import { A10Field } from 'components/Form/A10Field';

const validate = values => {

  const errors = {
    'virtual-server': {}
  };

  const nameVal = values.getIn([ 'virtual-server', 'name' ], '');

  if (!nameVal) {
    errors['virtual-server']['name'] = 'Required';
  } else if (nameVal.length < 2) {
    errors['virtual-server']['name'] = 'Less than 2 characters';
  }

  return errors;
};

const makeError = (status=true, errMsg='') => ( status ? '' : errMsg );

const ipv4 = (value) => {
  if (value) {
    const reg = /^(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$/;
    return makeError(reg.test(value), 'IPv4 Required');
  }
  return makeError();
};


class VirtualServerForm extends Component {

  filterFields() {

  }

  handleSubmit(v) {
    let values = Immutable.Map(v);
    // console.log(values.toJS());
    const pathWildcard = [ 'x', 'virtual-server','wildcard' ];
    if (values.hasIn(pathWildcard) 
       && values.getIn(pathWildcard) === true
       && values.getIn([ 'x', 'virtual-server', 'address-type' ]) === '0') {
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

    values = values.delete('x');
    const fullAuthData = {
      path: '/axapi/v3/slb/virtual-server/',
      method: 'POST', 
      body: values
    };

    return this.props.request(fullAuthData);
  }


  render() {
    const { handleSubmit, submitting, reset, pristine } = this.props;
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

                  <Field name="virtual-server.name" component={A10Field} label="Name">
                    <FormControl type="text" className="form-control"/>
                  </Field>

                  <Field name="x.virtual-server.wildcard" component={A10Field} label="Wildcard">
                    <Checkbox value={true} />
                  </Field>
                  
                  <Field name="x.virtual-server.address-type" component={A10Field} label="Address Type" value="0" conditional={{ 'x.virtual-server.wildcard': false }}>
                    <Radio value="0" inline> IPv4 </Radio>
                    <Radio value="1" inline> IPv6 </Radio>
                  </Field>

                  <Field name="virtual-server.ip-address" component={A10Field} label="IPv4 Address" validation={[ { func: 'required', msg: 'Required' }, { func: ipv4, msg: 'Must IPv4' } ] } conditional={{ 'x.virtual-server.address-type': '0' }}>
                    <FormControl type="text" className="form-control"/>
                  </Field>

                  <Field name="virtual-server.netmask" component={A10Field} label="Netmask" validation={[ 'required', { func: 'netmask', msg: 'Could be /24 or 255.255.x.x' } ] }  conditional={{ 'x.virtual-server.address-type': '0' }}>
                    <FormControl type="text" className="form-control"/>
                  </Field>

                  <Field name="virtual-server.ipv6-address" component={A10Field} label="IPv6 Address" validation={[ 'required', 'ipv6' ] } conditional={{ 'x.virtual-server.address-type': '1' }}>
                    <FormControl type="text" className="form-control"/>
                  </Field>

                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <ButtonToolbar>
                        <ButtonGroup bsSize="large">
                          <Button type="submit" disabled={submitting} bsStyle="success">
                            {submitting ? <i/> : <i/>} Create
                          </Button>
                          <Button type="button" disabled={pristine || submitting} onClick={reset} >
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
    );
  }
}

let InitializeFromStateForm = reduxForm({
  form: 'virtualServerForm',
  validate
}
 )(VirtualServerForm);


const initialValues = {
  'virtual-server': {
    'name': 'vs1',
    'netmask': '/24'
  },
  'x': {
    'virtual-server': {
      'address-type': '0',
      'wildcard': false
    }
  }
};

function mapStateToProps(state) {
  // return Object.assign(
  //     {},
  //     state.pto.toJS(),
  //     state.app.toJS()
  // );
  return {
    response: state.getIn([ 'axapi','response' ]),
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
