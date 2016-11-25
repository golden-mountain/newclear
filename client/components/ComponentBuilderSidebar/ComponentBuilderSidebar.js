import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Widgets from '../../constants/Widgets';
import { ComponentCandidate } from 'components';

export default class ComponentBuilderSidebar extends Component {
  render() {
    const componentTypes = [ {
      name: 'basic',
      type: 'basic',
      iconClass: 'fa fa-cube'
    }, {
      name: 'forms',
      type: 'forms',
      iconClass: 'fa fa-wpforms'
    }, {
      name: 'tables',
      type: 'tables',
      iconClass: 'fa fa-table'
    }, {
      name: 'charts',
      type: 'charts',
      iconClass: 'fa fa-bar-chart'
    } ];

    return (
      <Panel>
        <Tabs defaultActiveKey={1} id="ComponentBuilderSidebar">
          <Tab eventKey={1} title="Widgets">
            {
              componentTypes.map(componentType=>{
                return (
                  <div key={componentType.type}>
                    <span>
                      <i className={componentType.iconClass} ariaHidden="true" />
                      &nbsp;{componentType.name}
                    </span>
                    <ListGroup>
                      {
                        Widgets.filter((item)=>item.type === componentType.type)
                          .map((item, index)=>{
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
                    </ListGroup>
                  </div>
                );
              })
            }
          </Tab>
          <Tab eventKey={2} title="Layouts">
           {
              componentTypes.map(componentType=>{
                return (
                  <div key={componentType.type}>
                    <span>
                      <i className={componentType.iconClass} ariaHidden="true" />
                      &nbsp;{componentType.name}
                    </span>
                    <ListGroup>
                      {
                        Widgets.filter((item)=>item.type === componentType.type)
                          .map((item, index)=>{
                            return (
                              <ListGroupItem key={index}>
                                <i className={item.iconClassName} />
                                &nbsp;{item.name}
                              </ListGroupItem>
                            );
                          })
                      }
                    </ListGroup>
                  </div>
                );
              })
            }
          </Tab>
          <Tab eventKey={3} title="Autogen">
            <h3>Autogen</h3>
          </Tab>
       </Tabs>
      </Panel>
    );
  }
}
