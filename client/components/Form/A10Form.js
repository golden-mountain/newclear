import React, { Component, PropTypes } from 'react';
// import Redirect from 'react-router/Redirect';

import { Form } from 'react-bootstrap';
// import invariant from 'invariant';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { UPDATE_TARGET_DATA, HIDE_COMPONENT_MODAL, REDIRECT_ROUTE } from 'configs/messages'; // eslint-disable-line

class A10Form extends Component {
  static displayName = 'A10Form'
  static contextTypes = {
    props: PropTypes.object,
    ballKicker: PropTypes.object
  }

  // static componentId = uniqueId('A10Form-')
  onSubmit(event) {
    event.preventDefault();

    const onSuccess = () => {
      const { data, kickBall } = this.props;
      const { modal, targetInstancePath, parentPath: parentInstancePath } = this.context.props;
      if (data && data.signature && modal) {
        // console.log(data);
        kickBall(UPDATE_TARGET_DATA);
        return false;
      } else if (modal) {
        kickBall(UPDATE_TARGET_DATA, data, targetInstancePath );
        kickBall(HIDE_COMPONENT_MODAL, null, parentInstancePath);
      } else {
        kickBall(REDIRECT_ROUTE, { path: 'list' });
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
      horizontal,
      inline,
      onSubmit
    } = this.props;

    if (!onSubmit) onSubmit = ::this.onSubmit;
    // const { modal } = this.context.props;
    // console.log(this.context.props);

    // console.log('.......................................', children);
    const formProps = { bsClass, componentClass, horizontal, inline, onSubmit };
    return (
      <Form { ...formProps }>
        { children }
      </Form>
    );
  }
}

export default widgetWrapper([ 'app' ])(A10Form);
