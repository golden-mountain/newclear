import React, { Component } from 'react';
import { FieldArray } from 'redux-form/immutable'; // imported Field
import { FormControl, FormGroup, Button, Col, Row, ButtonToolbar, ButtonGroup, Panel, Radio, Checkbox, Table } from 'react-bootstrap';
import Helmet from 'react-helmet';
// import { isEqual } from 'lodash';
import { Map, fromJS } from 'immutable';
// import { SubmissionError } from 'redux-form';
import { A10Field, A10SchemaField } from 'components/Form/A10Field';
import A10Form from 'components/Form/A10Form';

import AppManager from 'helpers/AppManager';
import BaseForm from 'pages/BaseForm';

// import * as logger from 'helpers/logger';
import { isInt } from 'helpers/validations';
import slbVirtualServerSchema from 'schemas/slb-virtual-server.json';

const makeError = (status=true, errMsg='') => ( status ? '' : errMsg );

const ipv4 = (value) => {
  const reg = /^(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$/;
  return makeError(reg.test(value), 'IPv4 Required');
};


class A10FieldSubmit extends Component {

  render() {
    const { submitting, reset, pristine } = this.props;
    return (
      <Row>
        <Col xs={12}>
          <FormGroup>
            <Col smOffset={10} sm={2}>
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
        </Col>
      </Row>
    );
  }
}

const renderTable = ({ fields, meta: { touched, error } }) => {
  // fields.map((port) => {
  //   logger.debug(port);
  // });
  return (
    <Table responsive>
      <thead>
        <tr>
          <th cols="3"><button type="button" onClick={() => fields.push({ 
            'virtual-port': {
              'number': 81,
              'range': '80-100',
              'protocol': 'HTTP'
            }
          })} className="btn btn-primary">Add Member</button>
        {touched && error && <span>{error}</span>}</th>
        </tr>
        <tr>
          <th>Number</th>
          <th>Range</th>
          <th>Protocol</th>
        </tr>
      </thead>  
      <tbody>
      {fields.map((port, index) =>
        <tr key={index}>
          <td>
            <A10SchemaField layout={false} name={`${port}.virtual-port.number`} validation={{ isInt: isInt }}   />
          </td>

          <td>
            <A10SchemaField layout={false} name={`${port}.virtual-port.range`}  conditional={{ [ `${port}.virtual-port.number` ]: 91 }}/>
          </td>

          <td>     
            <A10SchemaField layout={false} name={`${port}.virtual-port.protocol`} >  
              <FormControl componentClass="select">
                <option value="tcp">tcp</option>
                <option value="udp">udp</option>
              </FormControl>
            </A10SchemaField>
          </td>
        </tr>
      )}
      </tbody>
    </Table>
  );
};


class VirtualServerForm extends BaseForm {
  // constructor(props) {
  //   super(props);
  // }

  handleSubmit(v) {
    // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    // const submitFailCallback = (data) => {
    //   console.log(data, 'error............');
    //   throw new SubmissionError({
    //     'virtual-server': {
    //       'ip-address': 'Error IP'
    //     },
    //     '_error': 'loginFailed'
    //   });
    // };


    let values = Map(v);
    // console.log(values.toJS());
    const pathWildcard = [ 'x', 'virtual-server','wildcard' ];
    if (values.hasIn(pathWildcard) 
       && values.getIn(pathWildcard) === true
       && values.getIn([ 'x', 'virtual-server', 'address-type' ]) === '0') {
      values = values.deleteIn(pathWildcard);
      let ip = fromJS({
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
    const { handleSubmit,  ...rest } = this.props;
    const elements = slbVirtualServerSchema.properties;
    // const schema = {
    //   'type': 'number',
    //   'minimum': '1',
    //   'maximum': '31',
    //   'minimum-partition': '1',
    //   'maximum-partition': '7',
    //   'example-default': '1',
    //   'description': 'Join a vrrp group (Specify ha VRRP-A vrid)',
    //   'format': 'number',
    //   'src-name': 'vrid'
    // };

    return (
      <div className="container-fluid">
        <Helmet title="Edit Virtual Server"/>
          <Row>
            <Col xs={2}>
              <h4>Help  </h4>

            </Col>
            <Col xs={10}>                   
                <A10Form onSubmit={handleSubmit(::this.handleSubmit)} schema={[ slbVirtualServerSchema ]} horizontal>
                  <Row>
                    <Col xs={6}>
                      <Panel header={<h4>Basic Field</h4>}>
                        <A10SchemaField schema={elements['name']} name="virtual-server.name" label="Name" value="vs2" /> 
     

                        <A10SchemaField  name="x.virtual-server.wildcard" component={A10Field} label="Wildcard" value={true}>
                          <Checkbox value={true} />
                        </A10SchemaField>
                        
                        <A10SchemaField name="x.virtual-server.address-type" component={A10Field} label="Address Type" value="0" conditional={{ 'x.virtual-server.wildcard': false }}>
                          <Radio value="0" inline> IPv4 </Radio>
                          <Radio value="1" inline> IPv6 </Radio>
                        </A10SchemaField>

                        <A10SchemaField schema={elements['ip-address']} name="virtual-server.ip-address" label="IPv4 Address" validation={{ ipv4: ipv4 }} conditional={{ 'x.virtual-server.address-type': '0' }} />

                        <A10SchemaField schema={elements['netmask']} name="virtual-server.netmask" component={A10Field} label="Netmask"  conditional={{ 'x.virtual-server.address-type': '0' }} />

                        <A10SchemaField schema={elements['ipv6-address']} name="virtual-server.ipv6-address" component={A10Field} label="IPv6 Address"  conditional={{ 'x.virtual-server.address-type': '1' }} />
                        <A10SchemaField schema={elements['ipv6-acl']} name="virtual-server.ipv6-acl" component={A10Field} label="IPv6 ACL" />
                        <A10SchemaField schema={elements['vrid']} name="virtual-server.vrid" label="VRRP-A" />                       
                      </Panel> 
                    </Col>

                    <Col xs={6}>
                      <Panel header={<h4>Virtual Ports</h4>}>
                        <FieldArray name="virtual-ports" component={renderTable}/>
                      </Panel>
                    </Col>
                  </Row>

                  <A10FieldSubmit {...rest}/>

                </A10Form>              
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
  },
  'virtual-ports': [
    { 
      'virtual-port': {
        'number': 80,
        'range': '80-100',
        'protocol': 'HTTP'
      }
    },
    { 
      'virtual-port': {
        'number': 81,
        'range': '80-101',
        'protocol': 'HTTPS'
      }
    }
  ]
};

const InitializeFromStateForm = AppManager({
  page: 'virtualServer',
  form: 'virtualServerForm', 
  initialValues: initialValues
})(VirtualServerForm);

export default InitializeFromStateForm;
