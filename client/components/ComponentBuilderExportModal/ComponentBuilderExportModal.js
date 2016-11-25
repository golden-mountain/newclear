import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

import { generateReactCodeFromSchema } from '../../helpers/generateReactCode';

export default class ComponentBuilderExportModal extends Component {
  static propTypes = {
    sandboxValue: PropTypes.object
  }

  render() {
    const { sandboxValue } = this.props;
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">Export</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
            <Tab eventKey={1} title="React">
              <Highlight
                className="javascript"
                style={{ width: '100%', height: 'auto', minHeight: 300 }}
              >
                {generateReactCodeFromSchema(sandboxValue)}
              </Highlight>
            </Tab>
            <Tab eventKey={2} title="Schema">
              <Highlight
                className="json"
                style={{ width: '100%', height: 'auto', minHeight: 300 }}
              >
                {JSON.stringify(sandboxValue, '\n', '  ')}
              </Highlight>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    );
  }
}
