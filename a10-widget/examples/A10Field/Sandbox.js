import React from 'react';
import { Col as BootstrapCol, Row as BootstrapRow, Tabs, Tab } from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';
import { Button as BootstrapButton } from 'react-bootstrap';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import _ from 'lodash';

import allLayouts from './layouts';
import allComponents from './components';

import ComponentBuilderProperties from '../../../client/components/ComponentBuilderProperties/ComponentBuilderProperties';
// import slbVirtualServerSchema from 'schemas/slb-virtual-server.json';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext } from 'react-dnd'; 

import editableUtils from '../../../generator/Editable/editableUtils';
import componentCandidate from '../../../generator/Editable/componentCandidate';


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
  _componentId: 'root',
  component: 'div',
  meta: containerSchema,
  children: [
    {
      _componentId: 'a',
      component: 'Button',
      children: 'Hello'
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
      componentMeta: null,
      editMode: true
    };
  }
  
  startToEditComponent(args) {
    const { componentMeta, componentProps } = args; 
    this.setState({
      editingComponentId: componentProps._componentId,
      editingComponentProps: componentProps,
      editingComponentMeta: componentMeta
    });
  }

  deleteComponent(_componentId)  {
    const newSchema = editableUtils.deleteComponent(this.state.reactSchema, _componentId);
    this.setState({ reactSchema: newSchema });
  }

  moveComponent(dragComponent, dropComponentId, isNew, newPosition)  {
    const newSchema = editableUtils.moveComponent(this.state.reactSchema, dragComponent, dropComponentId, isNew, newPosition);
    this.setState({ reactSchema: newSchema });
  }

  updateComponent(_componentId, component) {
    const newSchema = editableUtils.updateComponent(this.state.reactSchema, _componentId, component);
    this.setState({ 
      reactSchema: newSchema,
      editingComponentProps: component
    });
  }

  downloadJsxFile = ()=> {
    window.open('data:application/txt,' + encodeURIComponent(this.props.reactSchema), '_self');
  }

  toggleEditMode = ()=> {
    this.setState({ editMode: !this.state.editMode });
  }

  chooseLayout = (schema)=>{
    this.setState({
      reactSchema: schema
    });
  }

  render() {
    const {
      reactSchema
    } = this.state;

    const {
      editMode,
      editingComponentId,
      editingComponentProps,
      editingComponentMeta
    } = this.state;

    const Widgets = Object.values(allComponents)
      .filter(item=>item.meta)
      .map(item=> item.meta.widget);

    const groupedWidgets = _.groupBy(Widgets, widget => widget.type);
    // const groupLayout = _.groupBy(Object.values(allLayouts), layout)
    return (
      <BootstrapRow>
        <BootstrapCol xs={4}>
          <Panel>
            <BootstrapButton active={editMode} onClick={this.toggleEditMode}>
              {editMode ? (
                <span><i className="fa fa-eye" />&nbsp;View</span> 
              ) : (
                <span>
                  <i className="fa fa-pencil" />&nbsp;Edit
                </span> 
              )}
            </BootstrapButton>
            <br />
            <br />
            <br />
            <Tabs id="sandbox-controller-panel">
              <Tab eventKey={1} title="Components">
                <PanelGroup accordion defaultActiveKey="basic">
                  {
                    Object.keys(groupedWidgets).map(key=>{
                      return (
                        <Panel header={key} eventKey={key} key={key}>
                          {
                            groupedWidgets[key].map((item, index) => {
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
                        </Panel>
                      );
                    })

                  }
                </PanelGroup>
              </Tab>
              <Tab eventKey={2} title="Layout">
                <PanelGroup accordion defaultActiveKey="basic">
                  <Panel header="basic" eventKey="basic" key="basic">
                    {
                      Object.values(allLayouts).map((item, index)=>{
                        const style = {
                          width: '33%',
                          display: 'inline-block',
                          textAlign: 'center',
                          cursor: 'pointer'
                        };
                        return (
                          <span 
                            key={index} 
                            style={style} onClick={this.chooseLayout.bind(this, item.schema)}>
                            <i className={item.iconClassName} />
                            <br />
                            {item.name}
                          </span>
                        );
                      })
                    }
                  </Panel>
                </PanelGroup>
              </Tab>
              <Tab eventKey={3} title="JSX">
                <Highlight
                  className="javascript"
                  style={{ width: '100%', height: 'auto', minHeight: 300 }}
                >
                  { editableUtils.generateReactCodeFromSchema(reactSchema) }
                </Highlight>
                <BootstrapButton
                  onClick={::this.downloadJsxFile}
                >
                  Download
                </BootstrapButton>
              </Tab>
            </Tabs>
          </Panel>
         
        </BootstrapCol>
        <BootstrapCol xs={5}>
          <Panel header="Edit">
          
            {
              editableUtils.jsonToComponent(reactSchema, editMode, { editingComponentId }, {
                startToEditComponent: this.startToEditComponent.bind(this),
                deleteComponent: this.deleteComponent.bind(this),
                moveComponent: this.moveComponent.bind(this)
              })
            }
          
          </Panel>
        </BootstrapCol>
        <BootstrapCol xs={3}>
          <ComponentBuilderProperties
            editingComponentId={editingComponentId}
            componentProps={editingComponentProps}
            componentMeta={editingComponentMeta}
            updateComponent={this.updateComponent.bind(this)}
          />
        </BootstrapCol>
      </BootstrapRow>
    );
  }
}
