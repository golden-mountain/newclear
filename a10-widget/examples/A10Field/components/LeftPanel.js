import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

import componentCandidate from '../utils/componentCandidate';

export default class LeftPanel extends Component {
  static propTypes = {
    layouts: PropTypes.object.isRequired,
    widgets: PropTypes.object.isRequired,
    onLayoutChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.ComponentCandidate = componentCandidate(props.widgets);
  }

  render() {
    const {
      widgets,
      layouts,
      onLayoutChange
    } = this.props;

    const widgetList = Object.values(widgets)
      .filter(item=>item.meta)
      .map(item=> item.meta.widget);
    const groupedWidgets = _.groupBy(widgetList, widget => widget.type);
    const ComponentCandidate = this.ComponentCandidate;
    return (
      <Tabs id="sandbox-controller-panel">
        <Tab eventKey={1} title="Widgets">
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
        <Tab eventKey={2} title="Layouts">
          <PanelGroup accordion defaultActiveKey="basic">
            <Panel header="basic" eventKey="basic" key="basic">
              {
                Object.values(layouts).map((item, index)=>{
                  const style = {
                    width: '33%',
                    display: 'inline-block',
                    textAlign: 'center',
                    cursor: 'pointer'
                  };
                  return (
                    <span
                      key={index}
                      style={style}
                      onClick={onLayoutChange.bind(this, item.schema)}
                    >
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
        <Tab eventKey={3} title="Schema">
        </Tab>
      </Tabs>
    );
  }
}
