import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Select from 'react-select';

import allSchemas from '../../../../schemas/all-schemas.json';

export default class LeftPanelSchema extends React.Component {
  static propTypes = {
    selectedSchema: React.PropTypes.string,
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
      selectedSchema,
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
          <Select
            name="form-field-name"
            value={selectedSchema}
            options={allSchemas.map((item)=>{return { value: item, label: item }; })}
            onChange={onSchemaSelect}
          />
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
