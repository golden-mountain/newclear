import React from 'react';
import { Col, Row } from 'react-bootstrap';

// test components loading
import ContainerWidget from './components/ContainerWidget';
import NotEditableCom from './components/NotEditableCom';
import EditableCom from './components/EditableCom';
import FieldCheckbox from './components/FieldCheckbox';
import ComponentBuilderProperties from '../../../client/components/ComponentBuilderProperties/ComponentBuilderProperties';
// import slbVirtualServerSchema from 'schemas/slb-virtual-server.json';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext } from 'react-dnd'; 

import editableUtils from '../../../generator/Editable/editableUtils';
import componentCandidate from '../../../generator/Editable/componentCandidate';

const allComponents = {
  ContainerWidget,
  NotEditableCom,
  EditableCom,
  FieldCheckbox
};

editableUtils.registerComponents(allComponents);
const ComponentCandidate = componentCandidate(allComponents);

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
  componentId: 'root',
  component: 'ContainerWidget',
  meta: containerSchema,
  componentChildren: [
    {
      componentId: 'a',
      component: 'NotEditableCom',
      meta: metaWithEndpoint
    },
    {
      componentId: 'b',
      component: 'EditableCom',
      meta: metaWithSchema,
      title: 'Port'
    },
    {
      componentId: 'c',
      component: 'EditableCom',
      meta: noSchemaData,
      title: 'IP Address',
      validation: { 'ipv6-address': () => 'error IPv6' }
    },
    {
      componentId: 'd',
      component: 'EditableCom',
      meta: objectSchema,
      title: 'Netmask'
    }
  ]
};


@dragDropContext(HTML5Backend)
export default class Sandbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reactSchema: reactSchemaSource,
      editingComponentId: null,
      componentProps: null,
      componentPropTypes: null
    };
  }
  
  startToEditComponent(args) {
    console.log('startToEditComponent');
    const { componentPropTypes, componentProps } = args; 
    this.setState({
      editingComponentId: componentProps.componentId,
      editingComponentProps: componentProps,
      editingComponentPropTypes: componentPropTypes
    });
  }

  deleteComponent(componentId)  {
    const newSchema = editableUtils.deleteComponent(this.state.reactSchema, componentId);
    this.setState({ reactSchema: newSchema });
  }

  moveComponent(dragComponent, dropComponentId, isNew, newPosition)  {
    const newSchema = editableUtils.moveComponent(this.state.reactSchema, dragComponent, dropComponentId, isNew, newPosition);
    this.setState({ reactSchema: newSchema });
  }

  updateComponent(componentId, component) {
    const newSchema = editableUtils.updateComponent(this.state.reactSchema, componentId, component);
    this.setState({ 
      reactSchema: newSchema,
      editingComponentProps: component
    });
  }

  render() {
    const {
      reactSchema
    } = this.state;

    const {
      editingComponentId,
      editingComponentProps,
      editingComponentPropTypes
    } = this.state;

    const Widgets = Object.values(allComponents).map(item=>item.candidateMeta);

    return (
      <Row>
        <Col xs={4}>
          <h3>Component Candidates</h3>
          <div>
          {
            Widgets.map((item, index)=>{
              return (
                <ComponentCandidate
                  key={index}
                  name={item.name}
                  component={item.component}
                  iconClassName={item.iconClassName}
                  isContainer={item.isContainer === true}
                />
              );
            })
          }
          </div>
        </Col>
        <Col xs={8}>
          <h3> Drag and Drop Demo </h3>

          {
            editableUtils.jsonToComponent(reactSchema, true, { editingComponentId }, {
              startToEditComponent: this.startToEditComponent.bind(this),
              deleteComponent: this.deleteComponent.bind(this),
              moveComponent: this.moveComponent.bind(this)
            })
          }
        </Col>

        <ComponentBuilderProperties
          editingComponentId={editingComponentId}
          componentProps={editingComponentProps}
          componentPropTypes={editingComponentPropTypes}
          updateComponent={this.updateComponent.bind(this)}
        />
      </Row>
    );
  }
}
