import React, {Component, PropTypes} from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Col, Row, ButtonToolbar, ButtonGroup, Panel, Checkbox } from 'react-bootstrap';
import Helmet from 'react-helmet';

import { connect } from 'react-redux';
import { Field, Form, actions } from 'react-redux-form';

import Immutable from 'immutable';
import * as axapiActions from 'redux/modules/axapi';
import {bindActionCreators} from 'redux';

import A10Field from 'components/A10Field';


import { createFieldClass } from 'react-redux-form';

// TODO: react-redux-form don't support immutable
class AdcForm extends React.Component {

  handleSubmit(adc) {
    let { request, adcForm: {fields} } = this.props;
    // let list = Object.keys(fields);
    let adcMap = Immutable.fromJS(adc);
    // console.log(fields);
    for (let [name, field] of Object.entries(fields)) {
      if (field.viewValue === true) {
        adcMap = adcMap.deleteIn(name.split('.'));
      }
    }
  
    console.log(adcMap.toJS());
    const fullAuthData = {
      path: '/axapi/v3/slb/virtual-server/',
      method: "POST", 
      body: adcMap
    }

    return request(fullAuthData);

  }

  render() {
    let { adc, adcForm: { fields  }, setViewValue, submitting, pristine, reset } = this.props;
    // console.log(this.props);

    return (
      <div className="container-fluid">
        <Helmet title="API TESTER"/>
          <Row>
            <Col xs={2}>
              <h4>Virtual Server</h4>
            </Col>
            <Col xs={5}>   
              <h4>Basic Settings </h4>   
              <Panel>      
                <Form model="adc"
                  onSubmit={(adc) => this.handleSubmit(adc)} className="form-horizontal">
              
                  <A10Field model="adc.virtual-server.name" label="Name">
                    <input type="text" className="form-control" />
                  </A10Field>
               
                  <A10Field model="adc.virtual-server.wildcard" label="Wildcard" type="radio">
                    <input type="checkbox" />
                  </A10Field>
                    
                  <A10Field model="adc.virtual-server.ip-address" label="IP Address" conditional={{'adc.virtual-server.wildcard': false}}>
                    <input type="text" className="form-control" />
                  </A10Field>
               
                  <A10Field model="adc.virtual-server.netmask" label="Netmask" conditional={{'adc.virtual-server.wildcard':false
                  }}>
                    <input type="text"  className="form-control" />
                  </A10Field>

                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <ButtonToolbar>
                        <ButtonGroup bsSize="large">
                          <Button type="submit" disabled={submitting} bsStyle="success">
                            {submitting ? <i/> : <i/>} Request
                          </Button>
                          <Button type="button" disabled={pristine || submitting} onClick={() => reset('api')}>
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
              <h4>Save Preview </h4>
            </Col>
          </Row>
      </div>     
    );
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return { adc: state.adc, adcForm: state.adcForm };
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

export default connect(mapStateToProps, mapDispatchToProps)(AdcForm);
