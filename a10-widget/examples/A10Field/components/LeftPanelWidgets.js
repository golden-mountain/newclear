import React from 'react';
import fuzzy from 'fuzzy';
import _ from 'lodash';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class LeftPanelWidgets extends React.Component {
  static propTypes = {
    searchingWidgetName: React.PropTypes.string,
    tileStyle: React.PropTypes.object,
    widgets: React.PropTypes.object.isRequired,
    addComponentByClicking: React.PropTypes.func,
    ComponentCandidate: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      searchingWidgetName,
      tileStyle,
      widgets,
      ComponentCandidate,
      addComponentByClicking
    } = this.props;

    const dragableTileStyle = Object.assign({ cursor: 'move' }, tileStyle);
    const widgetList = Object.values(widgets)
      .filter(item=>item.meta)
      .filter(item=> !item.meta.widget.hideFromCandidates)
      .map(item=> item.meta.widget);
    const groupedWidgets = _.groupBy(widgetList, widget => widget.type);
    return (
      <div>
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
                      key={index}
                      style={dragableTileStyle}
                      component={item.component}
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
                          component={item.component}
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

      </div>
    );
  }
}
