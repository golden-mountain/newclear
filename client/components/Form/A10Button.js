import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { widgetWrapper } from 'helpers/widgetWrapper';

import { SHOW_COMPONENT_AS_MODAL } from 'configs/messages';

class A10Button extends Component {
  static displayName = 'A10Button'
  static contextTypes = {
    props: PropTypes.object,
    context: PropTypes.object
  }

  render() {
    const { children, componentClass, popup } = this.props;


    let buttonStyle = {
      cursor: 'pointer'
    };

    const click = () => {
      // kick to wrapper, wrapper know how to do
      this.props.kickBall(SHOW_COMPONENT_AS_MODAL, popup);
      return false;
    };

    const ButtonClass = componentClass || Button;
    return <ButtonClass onClick={click} style={buttonStyle}>{children}</ButtonClass>;
  }
}

export default widgetWrapper()(A10Button);
