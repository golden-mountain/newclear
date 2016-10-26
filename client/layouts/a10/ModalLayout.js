import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export default class ModalLayout extends Component {

  render() {
    const { children, modalProps, title, visible } = this.props;

    return (
      <Modal show={visible}  {...modalProps}>
        <Modal.Header>
          <Modal.Title>{ title }</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {children}
        </Modal.Body>    
      </Modal>
    );
  }
}
