import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { SHOW_COMPONENT_AS_MODAL, HIDE_COMPONENT_MODAL } from 'configs/messages';
import { widgetWrapper } from 'helpers/widgetWrapper';

class ModalLayout extends Component {
  render() {
    const { children, visible, title, ...props } = this.props;
    return (<Modal show={visible}  {...props}>
      <Modal.Header>
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>);
  }
}

class A10Modal extends Component {
  static displayName = 'A10Modal'
  state = { modals: [] }

  constructor(props, context) {
    super(props, context);
    this.props.catchBall(SHOW_COMPONENT_AS_MODAL, (from, to, params) => { // eslint-disable-line
      // console.log('catched the ball', from, params);
      let modals = this.state.modals;
      modals.push(params);
      this.setState({ modals });
    });

    this.props.catchBall(HIDE_COMPONENT_MODAL, (from, to, params) => { // eslint-disable-line
      let modals = this.state.modals;
      modals.pop(params);
      this.setState({ modals });
    });
  }


  render() {

    return (
      <div className="modalHome">
        { this.state.modals.map((modal, index) => {
          const { componentClass, modalProps, ...rest } = modal;
          console.log('...',componentClass, rest);
          const ComponentClass = componentClass;
          return <ModalLayout key={index} visible {...modalProps}><ComponentClass modal {...rest } /></ModalLayout>;
        }) }
      </div>
    );

  }
}

export default widgetWrapper()(A10Modal);
