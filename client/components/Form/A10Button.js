import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { widgetWrapper } from 'helpers/widgetWrapper';

import { HIDE_COMPONENT_MODAL } from 'configs/messages';
import ModalLayout from 'layouts/a10/ModalLayout';

class A10Button extends Component {
  static displayName = 'A10Button'
  static contextTypes = {
    props: PropTypes.object,
    context: PropTypes.object
  }

  state = {
    visible: false
  }

  constructor(props, context) {
    super(props, context);

    this.contentInstancePath = this.props.createInstancePath('A10ButtonModal');

    this.props.catchBall(HIDE_COMPONENT_MODAL, (from, to, params) => { // eslint-disable-line
      this.setState({ visible: false });
    }, this.contentInstancePath);

  }

  createModalChildren() {
    const { popup: { componentClass, ...componentProps }, parentPath } = this.props;  // eslint-disable-line
    const ModalComponent = componentClass;
    // console.log('A10Button', parentPath, this.contentInstancePath);
    return <ModalComponent modal {...componentProps} targetInstancePath={parentPath} _instancePath={this.contentInstancePath} />;
  }

  render() {
    const { children, componentClass, onClick, popup: { modalProps } } = this.props;
    // const modalChildren = this.createModalChildren();

    let buttonStyle = {
      cursor: 'pointer'
    };

    let click = () => {};
    if (typeof onClick == 'function') {
      click = onClick;
    } else if (modalProps) {
      click = () => {
        console.log('click.................');
        // kick to wrapper, wrapper know how to do
        this.setState({ visible: true });
        return false;
      };
    }

    const ButtonClass = componentClass || Button;
    return (
      <ButtonClass onClick={click} style={buttonStyle}>
        {children}
        { modalProps ?
          <ModalLayout visible={this.state.visible} {...modalProps} >
            { this.createModalChildren() }
          </ModalLayout>
        : null}
      </ButtonClass>);
  }
}

export default widgetWrapper()(A10Button);
