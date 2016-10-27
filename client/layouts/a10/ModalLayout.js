import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export default class ModalLayout extends Component {
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
