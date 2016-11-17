import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';
// import './scss/Modal.scss';

export default class ModalLayout extends Component {
  static currentModalIndex = 1050

  componentDidUpdate() {
    let $dialog = $('[role="dialog"]');
    $dialog.children('.modal-backdrop').css('zIndex', ModalLayout.currentModalIndex);
    $dialog.children('.modal').css('zIndex', ModalLayout.currentModalIndex++);    
  }

  render() {
    let { children, visible, title, bsSize, dialogClassName, ...props } = this.props;
    if (bsSize == 'super') {
      dialogClassName='largest-modal';
      bsSize='lg';
    }

    return (<Modal show={visible} bsSize={bsSize} dialogClassName={dialogClassName} {...props} ref="dialog">
      <Modal.Header>
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>);
  }
}
