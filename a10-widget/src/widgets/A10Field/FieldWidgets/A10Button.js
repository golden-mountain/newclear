import React, { Component, PropTypes } from 'react';
// import { isEqual } from 'lodash';
import { Button } from 'react-bootstrap';
import { widgetWrapper } from '../../../widgetWrapper';
import { HIDE_COMPONENT_MODAL } from '../../../consts/messages';
// import configApp from 'configs/app';
//
// const OEM = configApp.OEM;
// const ModalLayout = require('oem/' + OEM + '/ModalLayout').default;
import ModalLayout from '../../../layouts/ModalLayout';

class _A10Button extends Component {
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
  }

  componentWillUpdate(nextProps, nextState) { // eslint-disable-line
    // console.log('updating....');
    if (nextState.visible) {
      this.props.catchBall(HIDE_COMPONENT_MODAL, (from, to, params) => { // eslint-disable-line
        this.setState({ visible: false });
      }, this.contentInstancePath);
    }
  }

  render() {
    const {
      children,
      componentClass,
      onClick,
      popup: { endpoint='', modalProps, componentClass:ModalComponent, ...componentProps },
      parentPath,
      bsClass
    } = this.props;
    // const modalChildren = this.createModalChildren();
    // console.log(this.props);
    let buttonStyle = {
      cursor: 'pointer'
    };

    let click = () => {};
    if (typeof onClick == 'function') {
      click = onClick;
    } else if (modalProps) {
      click = () => {
        // let data = {};
        if (endpoint) {
          let result = this.props.comAxapiGet(endpoint);
          result.then(() => {
            this.setState({ visible: true });
          });
        } else {
          this.setState({ visible: true });
        }
        return false;
      };
    }

    const ButtonClass = componentClass || Button;
    let buttonProps = {};
    if (bsClass) {
      buttonProps.bsClass = bsClass;
    }

    return (
      <ButtonClass onClick={click.bind(this)} style={buttonStyle} {...buttonProps}>
        {children}
        { modalProps ?
          <ModalLayout visible={this.state.visible} {...modalProps} >
            <ModalComponent modal {...componentProps} targetInstancePath={parentPath} _instancePath={this.contentInstancePath} initial={this.props.data} />
          </ModalLayout>
        : null}
      </ButtonClass>);
  }
}

export const A10Button = widgetWrapper([ 'app' ])(_A10Button);
