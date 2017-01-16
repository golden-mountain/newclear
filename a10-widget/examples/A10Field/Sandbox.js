import _ from 'lodash';
import React from 'react';
import { Navbar, Grid, Col as BootstrapCol, Row as BootstrapRow } from 'react-bootstrap';

import 'highlight.js/styles/github.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext } from 'react-dnd'; 


import allLayouts from './layouts';
import allWidgets from './widgets';

import ComponentBuilderProperties from './components/ComponentBuilderProperties/ComponentBuilderProperties';
// import slbVirtualServerSchema from 'schemas/slb-virtual-server.json';

import LeftPanel from './components/LeftPanel';
import MainPanel from './components/MainPanel'; 
import editableUtils from './utils/editableUtils';

const urlParams = {
  'name': 'vs2',
  'port-number': 80,
  'protocol': 'http'
};

const metaWithSchema = {
  // schema: 'slb-virtual-server.port-list',
  name: 'virtual-server.port.port-number'
  // initial: '80'
  // loadInitial: true,
  // urlParams
};

// const { handleSubmit,  ...rest } = this.props; // eslint-disable-line
const metaWithEndpoint = {
  // endpoint: '/axapi/v3/slb/virtual-server/vs2', // pre
  name: 'virtual-server.name'
};

const containerSchema = {
  // schema: 'slb-virtual-server',
  endpoint: '/axapi/v3/slb/virtual-server/',
  name: 'virtual-server.description',
  initial: 'test description',
  loadInitial: true,
  urlParams
};

const objectSchema = {
  // schema: slbVirtualServerSchema,
  name: 'virtual-server.netmask'
  // initial: '/24',
  // loadInitial: true,
  // urlParams
};

const noSchemaData = {
  name: 'virtual-server.ip-address'
  // initial: '192.168.4.4',
  // loadInitial: true
};


const reactSchemaSource = {
  _componentId: 'root',
  component: 'RootWidget',
  _isRoot: true
};


@dragDropContext(HTML5Backend)
export default class Sandbox extends React.Component {

  constructor(props) {
    super(props);
    editableUtils.registerComponents(allWidgets);
    this.state = {
      reactSchema: reactSchemaSource,
      editingComponentId: null,
      componentProps: null,
      componentMeta: null
    };
  }
  
  startToEditComponent = (args) => {
    const { componentMeta, componentProps } = args; 
    this.setState({
      editingComponentId: componentProps._componentId,
      editingComponentProps: componentProps,
      editingComponentMeta: componentMeta
    });
  }

  deleteComponent = (_componentId) => {
    const newSchema = editableUtils.deleteComponent(this.state.reactSchema, _componentId);
    this.setState({ reactSchema: newSchema });
  }

  moveComponent = (dragComponent, dropComponentId, isNew, newPosition) => {
    const newSchema = editableUtils.moveComponent(this.state.reactSchema, dragComponent, dropComponentId, isNew, newPosition);
    this.setState({ reactSchema: newSchema });
  }

  updateComponent = (_componentId, component) => {
    const newSchema = editableUtils.updateComponent(this.state.reactSchema, _componentId, component);
    this.setState({ 
      reactSchema: newSchema,
      editingComponentProps: component
    });
  }

  stopEditingComponent = () => {
    this.setState({ editingComponentId: null });
  }

  downloadJsxFile = ()=> {
    window.open('data:application/txt,' + encodeURIComponent(this.props.reactSchema), '_self');
  }

  onLayoutChange = (schema)=>{
    this.setState({
      reactSchema: schema
    });
  }

  addComponentByClicking = (dragComponent) => {
    const {
      editingComponentId,
      editingComponentMeta
    } = this.state;
    if (editingComponentId && editingComponentMeta.widget.isContainer) {
      this.moveComponent(dragComponent, editingComponentId, true, 'inside');
    } else {
      this.moveComponent(dragComponent, 'root', true, 'inside');
    }
  }

  render() {
    const {
      reactSchema,
      editingComponentId,
      editingComponentProps,
      editingComponentMeta
    } = this.state;

    const Header = () => {
      return (
        <Navbar staticTop={true} fluid={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">A10 UI generator</a> 
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      );
    };
    return (
      <div>
        <Header />
        <Grid fluid={true}>
          <BootstrapRow>
            <BootstrapCol xs={3}>
              <LeftPanel 
                widgets={allWidgets}
                layouts={allLayouts}
                onLayoutChange={this.onLayoutChange}
                addComponentByClicking={this.addComponentByClicking}
              />
            </BootstrapCol>
            <BootstrapCol xs={5}>
              <MainPanel 
                editingComponentId={editingComponentId}
                schema={reactSchema}
                startToEditComponent={this.startToEditComponent}
                deleteComponent={this.deleteComponent}
                moveComponent={this.moveComponent}
                downloadJsxFile={this.downloadJsxFile}
              />
            </BootstrapCol>
            <BootstrapCol xs={4}>
              <ComponentBuilderProperties
                editingComponentId={editingComponentId}
                componentProps={editingComponentProps}
                componentMeta={editingComponentMeta}
                updateComponent={this.updateComponent}
                stopEditingComponent={this.stopEditingComponent}
              />
            </BootstrapCol>
          </BootstrapRow>
        </Grid>
      </div>
    );
  }
}
