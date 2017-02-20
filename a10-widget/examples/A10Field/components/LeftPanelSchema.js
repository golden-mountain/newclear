import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';

export default class LeftPanelSchema extends React.Component {
  static propTypes = {
    tileStyle: React.PropTypes.object,
    schemaWidgets: React.PropTypes.array,
    schemaLayouts: React.PropTypes.array,
    ComponentCandidate: React.PropTypes.func,
    addComponentByClicking: React.PropTypes.func,
    onLayoutChange: React.PropTypes.func,
    onSchemaSelect: React.PropTypes.func
  };

  static defaultProps = {
    schemaWidgets: [],
    schemaLayouts: []
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      tileStyle,
      schemaWidgets,
      schemaLayouts,
      ComponentCandidate,
      addComponentByClicking,
      onLayoutChange,
      onSchemaSelect
    } = this.props;
    const dragableTileStyle = Object.assign({ cursor: 'move' }, tileStyle);
    return (
      <div>
        <FormGroup>
          <InputGroup>
            <FormControl 
              type="text" 
              placeholder="Search axapi"
              onChange={onSchemaSelect}
            />
            <InputGroup.Addon>
              <i className="fa fa-search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <PanelGroup accordion defaultActiveKey="Layout">
          <Panel header="Layout" eventKey="Layout" key="Layout">
            {
              schemaLayouts.map((item, index)=>{
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
          <Panel header="Widget" eventKey="Widget" key="Widget">
            {
              schemaWidgets.map((item, index) => {
                return (
                  <ComponentCandidate
                    key={index}
                    style={dragableTileStyle}
                    component={item.component}
                    addComponentByClicking={addComponentByClicking}
                    meta={ { defaultProps: item.defaultProps } }
                  />
                );
              })
            }
          </Panel>
        </PanelGroup>
      </div>
    );
  }
}
