import React, { Component } from 'react';
import Redirect from 'react-router/Redirect';
import { Form } from 'react-bootstrap';
// import invariant from 'invariant';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { UPDATE_TARGET_DATA, HIDE_COMPONENT_MODAL, REDIRECT_ROUTE } from 'configs/messages'; // eslint-disable-line

class A10Form extends Component {
  static displayName = 'A10Form'
  // static componentId = uniqueId('A10Form-')
  onSubmit(event) {
    event.preventDefault();
    const onSuccess = () => {
      const { data, modal, targetInstancePath } = this.props;
      if (data && data.signature && modal) {
        // everything need update if logined
        this.props.kickBall(UPDATE_TARGET_DATA);
        return false;
      } else if (modal) {
        const parentInstancePath = this.props.findParent(A10Form.displayName);
        this.props.kickBall(UPDATE_TARGET_DATA, null, targetInstancePath );
        this.props.kickBall(HIDE_COMPONENT_MODAL, null, parentInstancePath);
      } else {
        this.props.kickBall(REDIRECT_ROUTE, { path: 'list' });
      }
    };
    this.props.save(onSuccess.bind(this));
  }

  // shouldComponentUpdate(nextProps) {
  //   const { data, modal } = nextProps;
  //   if (data && data.signature && modal) {
  //     // everything need update if logined
  //     this.props.kickBall(UPDATE_TARGET_DATA);
  //     return false;
  //   }
  //
  //   return true;
  // }

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
