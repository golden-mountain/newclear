import React, { Component, PropTypes } from 'react';
// import { isEqual } from 'lodash';
import { Button } from 'react-bootstrap';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { HIDE_COMPONENT_MODAL } from 'configs/messages';
import configApp from 'configs/app';

import { getResponseBody } from 'helpers/axapiHelper';
// import { getInfo } from 'helpers/axapiHelper';

const OEM = configApp.OEM;
const ModalLayout = require('oem/' + OEM + '/ModalLayout').default;

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
  }

  // componentWillMount() {
  //   console.log('mount....');
  //   this.props.catchBall(HIDE_COMPONENT_MODAL, (from, to, params) => { // eslint-disable-line
  //     this.setState({ visible: false });
  //   }, this.contentInstancePath);
  // }

  componentWillUpdate(nextProps, nextState) { // eslint-disable-line
    // console.log('updating....');
    if (nextState.visible) {
      this.props.catchBall(HIDE_COMPONENT_MODAL, (from, to, params) => { // eslint-disable-line
        this.setState({ visible: false });
      }, this.contentInstancePath);
    }
  }

  // shouldComponentUpdate(nextProps, nextState) { // eslint-disable-line
  //   // console.log(nextProps, nextState);
  //   return !isEqual(this.state, nextState);
  // }

  render() {
    const {
      children,
      componentClass,
      onClick,
      popup: { endpoint, modalProps, componentClass:ModalComponent, ...componentProps },
      parentPath,
      bsClass
    } = this.props;
    // const modalChildren = this.createModalChildren();
    // console.log(this.props);
    let buttonStyle = {
      cursor: 'pointer'
    };
    // console.log('.................................fetched data .......................');
    // console.log(this.props.data);
    let click = () => {};
    if (typeof onClick == 'function') {
      click = onClick;
    } else if (modalProps) {
      click = () => {
        let data = {};
        if (endpoint) {
          // console.log('.................................before getting.......................');
          const result = this.props.comAxapiGet(endpoint);
          // console.log('.................................send getting.......................');
          result.then((d) => {
            // console.log(getResponseBody(data.pop()));
            data = getResponseBody(d.pop());
            this.setState({ visible: true, data });
            // console.log('.................................finished getting.......................');
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
            <ModalComponent modal {...componentProps} targetInstancePath={parentPath} _instancePath={this.contentInstancePath} initial={this.state.data} />
          </ModalLayout>
        : null}
      </ButtonClass>);
  }
}

export default widgetWrapper()(A10Button);
