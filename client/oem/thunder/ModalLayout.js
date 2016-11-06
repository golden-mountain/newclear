import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
// import './scss/Modal.scss';

export default class ModalLayout extends Component {
  render() {
    let { children, visible, title, bsSize, dialogClassName, ...props } = this.props;
    if (bsSize == 'super') {
      dialogClassName='largest-modal';
      bsSize='lg';
    }

    return (<Modal show={visible} bsSize={bsSize} dialogClassName={dialogClassName} {...props}>
      <Modal.Header>
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>);
  }
}
