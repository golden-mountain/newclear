import React, {Component, PropTypes} from 'react';

// import { connect } from 'react-redux';
// import { Field, Form, actions } from 'react-redux-form/immutable';

// // TODO: react-redux-form don't support immutable
// class AdcForm extends React.Component {
//   handleSubmit(adc) {
//     let { dispatch } = this.props;

//     // Do whatever you like in here.
//     // You can use actions such as:
//     // dispatch(actions.submit('adc', somePromise));
//     // etc.
//   }
//   render() {
//     let { adc } = this.props;
//     // console.log(adc);
//     return (
//       <Form model="adc"
//         onSubmit={(adc) => this.handleSubmit(adc)}>
//         <Field model="adc.firstName">
//           <label>First name:</label>
//           <input type="text" />
//         </Field>

//         <Field model="adc.lastName">
//           <label>Last name:</label>
//           <input type="text" />
//         </Field>

//         <button type="submit">
//           Finish registration, { adc.firstName } { adc.lastName }!
//         </button>
//       </Form>
//     );
//   }
// }

// function mapStateToProps(state) {
//   // console.log(state);
//   return { adc: state.getIn(['adc']) };
// }


// export default connect(mapStateToProps)(AdcForm);

export default class AdcForm extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}