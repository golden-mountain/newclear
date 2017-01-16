import React, { PropTypes } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Highlight from 'react-highlight';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import editableUtils from '../utils/editableUtils';

export default class MainPanel extends React.Component {
  static propTypes = {
    editingComponentId: PropTypes.string,
    schema: PropTypes.object,
    startToEditComponent: PropTypes.func,
    deleteComponent: PropTypes.func,
    moveComponent: PropTypes.func,
    downloadJsxFile: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      icon: 'fa-th',
      type: 'basic',
      name: 'newLayout'
    };
  }

  onIconChange = (event) => {
    this.setState({
      icon: event.target.value
    });
  }

  onTypeChange = (event) => {
    this.setState({
      type: event.target.value
    });
  }

  onNameChange = (event) => {
    this.setState({
      name: event.target.value
    });
  }

  render() {
    const { 
      editingComponentId,
      schema,
      startToEditComponent,
      deleteComponent,
      moveComponent,
      downloadJsxFile
    } = this.props;

    const {
      icon,
      type,
      name
    } = this.state;

    return (
      <Tabs id="sandbox-main-area">
        <Tab eventKey={1} title={<span><i className="fa fa-pencil" />&nbsp;Edit</span>}>
          <Panel>
            {
              editableUtils.jsonToComponent(schema, true, { editingComponentId }, {
                startToEditComponent,
                deleteComponent,
                moveComponent
              })
            }
          </Panel>
        </Tab>
        <Tab eventKey={2} title={<span><i className="fa fa-eye" />&nbsp;Preview</span>}>
          <Panel>
            { editableUtils.jsonToComponent(schema, false) }
          </Panel>
        </Tab>
        <Tab eventKey={3} title={<span><i className="fa fa-code" />&nbsp;Code</span>}>
          <Highlight
            className="javascript"
            style={{ width: '100%', height: 'auto', minHeight: 300 }}
          >
            { editableUtils.generateReactCodeFromSchema(schema) }
          </Highlight>
          <ButtonToolbar className="pull-right">
            <Button bsStyle="primary" >
              <i className="fa fa-save"/>&nbsp;Save
            </Button>
            <Button onClick={downloadJsxFile} >
              <i className="fa fa-share-square-o"/>&nbsp;Export
            </Button>
          </ButtonToolbar>
        </Tab>
        <Tab eventKey={4} title={<span><i className="fa fa-codepen" />&nbsp;Schema</span>}>
          <Panel>
            <Form>
              <h3> Layout Properties </h3>
              <FormGroup>
                <FormControl 
                  type="text" 
                  onChange={this.onIconChange}
                  value={icon}
                  placeholder="icon" 
                />
              </FormGroup>
              <FormGroup>
                <FormControl 
                  type="text" 
                  onChange={this.onTypeChange}
                  value={type}
                  placeholder="type" 
                />
              </FormGroup>
              <FormGroup>
                <FormControl 
                  type="text" 
                  onChange={this.onNameChange}
                  value={name}
                  placeholder="name" 
                />
              </FormGroup>
            </Form>
          </Panel>
          <Highlight
            className="javascript"
            style={{ width: '100%', height: 'auto', minHeight: 300 }}
          >
            {
             'export default ' + JSON.stringify({
               iconClassName: `fa ${icon}`,
               type,
               name,
               schema
             }, null, 2).replace(/\"([^(\")"]+)\":/g,"$1:")
           }
          </Highlight>
        </Tab>
      </Tabs> 
    );
  }
}
