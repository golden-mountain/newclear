import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { SHOW_COMPONENT_AS_MODAL } from 'configs/messages';
import { widgetWrapper } from 'helpers/widgetWrapper';

class A10Modal extends Component {
  static displayName = 'A10Modal'
  state = { visible: false, params: null }

  constructor(props, context) {
    super(props, context);
    this.props.catchBall(SHOW_COMPONENT_AS_MODAL, (from, to, params) => {
      console.log(from, to, params);
      console.log('catched the ball', params);
      this.setState({ visible: true, params });
    });
  }

  render() {
    if (!this.state.visible) {
      return null;
    } else {
      const { componentClass, modalProps: { title, props }, ...rest } = this.state.params;
      const ComponentClass = componentClass;

      return (
        <Modal show={this.state.visible}  {...props}>
          <Modal.Header>
            <Modal.Title>{ title }</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ComponentClass {...rest} />
          </Modal.Body>
        </Modal>
      );
    }
  }
}

export default widgetWrapper()(A10Modal);
