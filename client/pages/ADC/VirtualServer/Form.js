import React, { Component } from 'react';
import { Field } from 'a10-redux-form/immutable'; // imported Field
import { Form, FormGroup, FormControl, Button, Col, Row, ButtonToolbar, ButtonGroup, Panel, Radio, Checkbox } from 'react-bootstrap';
import Helmet from 'react-helmet';

import Immutable from 'immutable';
// import { SubmissionError } from 'a10-redux-form';
import { A10Field } from 'components/Form/A10Field';

import AppManager from 'helpers/AppManager';

const makeError = (status=true, errMsg='') => ( status ? '' : errMsg );

const ipv4 = (value) => {
  if (value) {
    const reg = /^(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$/;
    return makeError(reg.test(value), 'IPv4 Required');
  }
  return makeError();
};


class VirtualServerForm extends Component {

  // // not excuted???
  // componentWillUnmount() {
  //   // console.log('unmounting.......................');
  //   this.props.clearAxapiLastError();
  // }

  // filterFields() {

  // }

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

    return this.props.axapiRequest(fullAuthData);
  }


  render() {
    const { handleSubmit, submitting, reset, pristine } = this.props;
    // console.log('........................', page.toJS(), '................................');
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


const initialValues = {
  'virtual-server': {
    'name': 'vs',
    'netmask': '/24'
  },
  'x': {
    'virtual-server': {
      'address-type': '0',
      'wildcard': false
    }
  }
};

const InitializeFromStateForm = AppManager({
  page: 'virtualServer',
  form: 'virtualServerForm', 
  initialValues: initialValues
})(VirtualServerForm);

export default InitializeFromStateForm;
