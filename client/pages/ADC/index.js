import React, {Component, PropTypes} from 'react';

import { connect } from 'react-redux';
import { Field, Form, actions } from 'react-redux-form';

import Immutable from 'immutable';
import * as axapiActions from 'redux/modules/axapi';
import {bindActionCreators} from 'redux';


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
    let { adc, adcForm: { fields  }, setViewValue } = this.props;
    // console.log(this.props);

    return (
      <Form model="adc"
        onSubmit={(adc) => this.handleSubmit(adc)}>

        <Field model="adc.virtual-server.name">
          <label>Name</label>
          <input type="text" />
        </Field>

        <Field model="adc.virtual-server.wildcard" >
          <label>Wildcard</label>
          <input type="checkbox" onChange={(e) => {
            setViewValue('adc.virtual-server.ip-address', e.target.checked)
            }
          }  />
        </Field>

        { fields['virtual-server.ip-address'].viewValue && 
          <Field model="adc.virtual-server.ip-address" >
            <label>IP Address</label>
            <input type="text" />
          </Field>
        }

        { fields['virtual-server.ip-address'].viewValue && 
            <Field model="adc.virtual-server.netmask">
              <label>Netmask</label>
              <input type="text" />
            </Field>
        }

        <button type="submit">
          Finish registration
        </button>
      </Form>
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
