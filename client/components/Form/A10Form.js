import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';

class A10Form extends Component {
  // context defined at page
  constructor(props, context) {
    super(props, context);
    if (!context.props) {
      throw new Error('Config should passed from parent');
    }

    this._context = context;
  }

  render() {
    let { schema, children, onSubmit, ...rest } = this.props;
    console.log(schema);
    const handleSubmit = this._context.props.handleSubmit;
    return (
      <Form onSubmit={ handleSubmit(onSubmit) } { ...rest }>
        { children }
      </Form>      
    );
  }
}

A10Form.contextTypes = {
  props: PropTypes.object
};

// const A10Form = connect(
//   // (state) => {
//   //   return {
//   //     app: state.getIn([ 'app' ]),
//   //     pageForm: state.getIn([ 'form' ])
//   //   };
//   // },
// )(MyForm);

export default A10Form;
