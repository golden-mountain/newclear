import React, { Component } from 'react';
import Redirect from 'react-router/Redirect';
import { Form } from 'react-bootstrap';
// import invariant from 'invariant';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { UPDATE_TARGET_DATA } from 'configs/messages';

class A10Form extends Component {
  static displayName = 'A10Form'
  // static componentId = uniqueId('A10Form-')
  onSubmit(event) {
    event.preventDefault();
    this.props.save();
  }

  shouldComponentUpdate(nextProps) {
    const { data, modal } = nextProps;
    if (data && data.signature && modal) {
      // everything need update if logined
      this.props.kickBall(UPDATE_TARGET_DATA);
      return false;
    }

    return true;
  }

  render() {
    let {
      // Form props
      bsClass,
      children,
      componentClass,
      data,
      horizontal,
      inline,
      modal,
      onSubmit, 
      redirect='/'
    } = this.props;

    if (!onSubmit) onSubmit = ::this.onSubmit;

    // console.log('.......................................', children);
    const formProps = { bsClass, componentClass, horizontal, inline, onSubmit };
    return (
      data && data.signature ? (modal ? null : <Redirect to={redirect} />) :
      <Form { ...formProps }>
        { children }
      </Form>
    );
  }
}

export default widgetWrapper([ 'app' ])(A10Form);
