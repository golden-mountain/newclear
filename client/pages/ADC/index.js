import React, {Component, PropTypes} from 'react';

import { connect } from 'react-redux';
import { Field, Form, actions } from 'react-redux-form';

// TODO: react-redux-form don't support immutable
class AdcForm extends React.Component {

  handleSubmit(adc) {
    let { dispatch } = this.props;
    console.log(adc);
    // Do whatever you like in here.
    // You can use actions such as:
    // dispatch(actions.submit('adc', somePromise));
    // etc.
  }

  render() {
    let { adc, dispatch, adcForm: { fields  } } = this.props;
    console.log(fields);
    return (
      <Form model="adc"
        onSubmit={(adc) => this.handleSubmit(adc)}>

        <Field model="adc.virtual-server.name">
          <label>Name</label>
          <input type="text" />
        </Field>

        <Field model="adc.virtual-server.wildcard">
          <label>Wildcard</label>
          <input type="checkbox" onChange={(e) => dispatch(actions.setViewValue('adc.virtual-server.ip-address', e.target.checked))}  />
        </Field>

        { fields['virtual-server.ip-address'].viewValue && 
          <Field model="adc.virtual-server.ip-address">
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


export default connect(mapStateToProps)(AdcForm);
