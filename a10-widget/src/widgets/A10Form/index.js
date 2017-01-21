import React, { Component, PropTypes } from 'react';
// import Redirect from 'react-router/Redirect';

import { Form } from 'react-bootstrap';
// import invariant from 'invariant';
import widgetWrapper from '../../widgetWrapper';
import { UPDATE_TARGET_DATA, HIDE_COMPONENT_MODAL, REDIRECT_ROUTE } from '../../consts/messages'; // eslint-disable-line

class A10Form extends Component {
  static displayName = 'A10Form'
  static contextTypes = {
    props: PropTypes.object,
    ballKicker: PropTypes.object
  }

  static propTypes = {
    schema: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]).isRequired,
    redirect: PropTypes.object,
    horizontal: PropTypes.bool
  }

  // static componentId = uniqueId('A10Form-')
  onSubmit(event) {
    event.preventDefault();

    const onSuccess = () => {
      const { data, kickBall, redirect } = this.props;
      const { modal, targetInstancePath, parentPath: parentInstancePath } = this.context.props;
      if (data && data.signature && modal) {
        // console.log(data);
        kickBall(UPDATE_TARGET_DATA);
        return false;
      } else if (modal) {
        kickBall(UPDATE_TARGET_DATA, data, targetInstancePath );
        kickBall(HIDE_COMPONENT_MODAL, null, parentInstancePath);
      } else {
        kickBall(REDIRECT_ROUTE, redirect || '/');
      }
    };
    this.props.modelSave(onSuccess.bind(this));
  }

  componentWillUpdate() {
    // console.log('mount.......');
    const { initial } = this.context.props;
    // console.log('Parent Path:', node.model.instancePath, 'A10Form path:', this.props.node.model.instancePath);
    if (initial) {
      this.props.modelInitializeChildren(initial);
    } else {
      // TODO: load from URL
    }
  }

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
    // console.log(this.context.props);

    const formProps = { bsClass, componentClass, horizontal, inline, onSubmit };
    return (
      <Form { ...formProps }>
        { children }
      </Form>
    );
  }
}

export default widgetWrapper([ 'app' ])(A10Form);
