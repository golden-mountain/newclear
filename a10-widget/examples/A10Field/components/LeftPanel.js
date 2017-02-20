import React, { PropTypes, Component } from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

import componentCandidate from '../utils/componentCandidate';
import atenSchema from '../utils/atenSchema';
import LeftPanelWidgets from './LeftPanelWidgets';
import LeftPanelLayouts from './LeftPanelLayouts';
import LeftPanelSchema from './LeftPanelSchema';

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
      searchingLayoutName: '',
      schemaLayouts: [],
      schemaWidgets: []
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

  onSchemaSelect = (event) => {
    atenSchema.getSchema(event.target.value)
      .then(({ layout, candidates }) => {
        this.setState({
          schemaLayouts: [ layout ],
          schemaWidgets: candidates
        });
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
      searchingLayoutName,
      schemaWidgets,
      schemaLayouts
    } = this.state;

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
    
    return (
      <Tabs id="sandbox-controller-panel">
        <br />
        <Tab eventKey={1} title="Widgets">
          <LeftPanelWidgets 
            searchingWidgetName={searchingWidgetName}
            widgets={widgets}
            addComponentByClicking={addComponentByClicking}
            tileStyle={tileStyle}
            ComponentCandidate={ComponentCandidate}
          />
        </Tab>

        <Tab eventKey={2} title="Layouts">
          <LeftPanelLayouts
            searchingLayoutName={searchingLayoutName}
            layouts={layouts}
            onLayoutChange={onLayoutChange}
            tileStyle={tileStyle}
          />
        </Tab>

        <Tab eventKey={3} title="Schema">
          <LeftPanelSchema 
            tileStyle={tileStyle}
            schemaWidgets={schemaWidgets}
            schemaLayouts={schemaLayouts}
            onSchemaSelect={this.onSchemaSelect}
            ComponentCandidate={ComponentCandidate}
            addComponentByClicking={addComponentByClicking}
            onLayoutChange={onLayoutChange}
          />
        </Tab>
      </Tabs>
    );
  }
}
