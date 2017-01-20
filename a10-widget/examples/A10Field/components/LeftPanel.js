import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import fuzzy from 'fuzzy';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import componentCandidate from '../utils/componentCandidate';

export default class LeftPanel extends Component {
  static propTypes = {
    layouts: PropTypes.object.isRequired,
    widgets: PropTypes.object.isRequired,
    onLayoutChange: PropTypes.func,
    addComponentByClicking: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.ComponentCandidate = componentCandidate(props.widgets);
    this.state = {
      searchingWidgetName: '',
      searchingLayoutName: ''
    };
  }

  onSearchingWidgetNameChange = (event) => {
    this.setState({
      searchingWidgetName: event.target.value
    });
  }

  clearSearchingWidgetName = () => {
    this.setState({
      searchingWidgetName: ''
    });
  }

  onSearchingLayoutName = (event) => {
    this.setState({
      searchingLayoutName: event.target.value
    });
  }

  clearSearchingLayoutName = () => {
    this.setState({
      searchingLayoutName: ''
    });
  }


  render() {
    const {
      widgets,
      layouts,
      onLayoutChange,
      addComponentByClicking
    } = this.props;
    const {
      searchingWidgetName,
      searchingLayoutName
    } = this.state;

    const widgetList = Object.values(widgets)
      .filter(item=>item.meta)
      .filter(item=> !item.meta.widget.hideFromCandidates)
      .map(item=> item.meta.widget);
    const groupedWidgets = _.groupBy(widgetList, widget => widget.type);
    const ComponentCandidate = this.ComponentCandidate;
    const tileStyle = {
      width: '33%',
      display: 'inline-block',
      textAlign: 'center',
      marginBottom: 10,
      cursor: 'pointer',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'

    };
    const dragableTileStyle = Object.assign({ cursor: 'move' }, tileStyle);

    return (
      <Tabs id="sandbox-controller-panel">
        <br />
        
        <Tab eventKey={1} title="Widgets">
          <FormGroup>
            <InputGroup>
              <FormControl 
                type="text" 
                placeholder="Search widgets"
                value={searchingWidgetName}
                onChange={this.onSearchingWidgetNameChange} />
              <InputGroup.Addon>
                <i className="fa fa-search" />
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          {
            searchingWidgetName && (
              <Panel header={
                <div>
                  <span>Search Result</span>
                  <i className="fa fa-close pull-right" style={{ cursor: 'pointer' }} onClick={this.clearSearchingWidgetName}/>
                </div>
              }>
                {
                  fuzzy.filter(searchingWidgetName, widgetList, {
                    pre: '<strong style="color: blue;">',
                    post: '</strong>',
                    extract: item => item.name
                  })
                  .map(item=> Object.assign({}, item.original, {
                    name: (
                      <span dangerouslySetInnerHTML={{ __html: item.string }}/>
                    )
                  }))
                  .map((item, index) => {
                    return (
                      <ComponentCandidate
                        style={dragableTileStyle}
                        key={index}
                        name={item.name}
                        component={item.component}
                        iconClassName={item.iconClassName}
                        isContainer={item.isContainer === true}
                        addComponentByClicking={addComponentByClicking}
                      />
                    );
                  })
                }
              </Panel>
            )
          }
        

          <PanelGroup accordion defaultActiveKey="Field">
            {
              Object.keys(groupedWidgets).map(key=>{
                return (
                  <Panel header={key} eventKey={key} key={key}>
                    {
                      groupedWidgets[key].map((item, index) => {
                        return (
                          <ComponentCandidate
                            style={dragableTileStyle}
                            key={index}
                            name={item.name}
                            component={item.component}
                            iconClassName={item.iconClassName}
                            isContainer={item.isContainer === true}
                            addComponentByClicking={addComponentByClicking}
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
          <FormGroup>
            <InputGroup>
              <FormControl 
                type="text" 
                placeholder="Search layouts"
                value={searchingLayoutName}
                onChange={this.onSearchingLayoutName}
              />
              <InputGroup.Addon>
                <i className="fa fa-search" />
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          {
            searchingLayoutName && (
              <Panel header={
                <div>
                  <span>Search Result</span>
                  <i className="fa fa-close pull-right" style={{ cursor: 'pointer' }} onClick={this.clearSearchingLayoutName}/>
                </div>
              }>
                {
                  fuzzy.filter(searchingLayoutName, Object.values(layouts), {
                    pre: '<strong style="color: blue;">',
                    post: '</strong>',
                    extract: item => item.name
                  })
                  .map(item=> Object.assign({}, item.original, {
                    name: (
                      <span dangerouslySetInnerHTML={{ __html: item.string }}/>
                    )
                  }))
                  .map((item, index) => {
                    return (
                      <span
                        key={index}
                        style={tileStyle}
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
            )
          }
          
          <PanelGroup accordion defaultActiveKey="basic">
            <Panel header="basic" eventKey="basic" key="basic">
              {
                Object.values(layouts).map((item, index)=>{
                  return (
                    <span
                      key={index}
                      style={tileStyle}
                      title={item.name}
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
          <FormGroup>
            <InputGroup>
              <FormControl type="text" placeholder="Search axapi"/>
              <InputGroup.Addon>
                <i className="fa fa-search" />
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </Tab>
      </Tabs>
    );
  }
}
