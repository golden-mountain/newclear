
import 'react-select/dist/react-select.css';

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Form from 'react-bootstrap/lib/Form';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Select from 'react-select';
import MultiOptionsEdit from './properties/MultiOptionsEdit';

export default class ComponentBuilderProperties extends Component {
  static propTypes = {
    editingComponentId: PropTypes.string,
    componentProps: PropTypes.object,
    componentMeta: PropTypes.object,
    updateComponent: PropTypes.func,
    stopEditingComponent: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.componentProps) {
      if (!this.props.componentProp || this.props.componentProps._componentId !== nextProps.componentProps._componentId) {
        this.state = {};
      }
      this.setState(this.getStateFromProps(nextProps));
    }
  }

  onInputChange(propTypeName, event) {
    this.setState({
      [propTypeName]: event.target.value
    });
    this.updateComponent();
  }

  onNumberInputChange(propTypeName, event) {
    this.setState({
      [propTypeName]: parseFloat(event.target.value)
    });
    this.updateComponent();
  }

  onCheckBoxChange(propTypeName, event) {
    this.setState({
      [propTypeName]: event.target.checked
    });
    this.updateComponent();
  }

  onOptionsChange(propTypeName, options) {
    /* To make sure this options array in state always point to the same array */
    const thisOptions = this.state[propTypeName];
    thisOptions.length = 0;
    Array.prototype.push.apply(thisOptions, options);

    this.setState({
      [propTypeName]: thisOptions
    });
    this.updateComponent();
  }

  onSelectChange(propTypeName, option) {
    this.setState({
      [propTypeName]: option.value
    });
    this.updateComponent();
  }

  onDismissComponentBuilderPrperties() {
    this.props.stopEditingComponent();
  }

  getStateFromProps(props) {
    const { componentProps } = props;
    if (componentProps) {
      return Object.assign({ children: '', style: {} }, componentProps);
    }
  }

  updateComponent = _.debounce(() =>{
    this.props.updateComponent(this.props.componentProps._componentId, Object.assign({}, this.state, {
      children: null,
      connectDropTarget: null,
      connectDragSource: null
    }));
  }, 100)

  getGroupComponentProperties() {
    const {
      componentMeta = {}
    } = this.props;
    const groupComponentProperties = (componentMeta && componentMeta.propTypes ? Object.keys(componentMeta.propTypes).map((key)=>{
      return {
        prop: key,
        type: componentMeta.propTypes[key],
        group: componentMeta.propGroups[key],
        validation: componentMeta.propValidations && componentMeta.propValidations[key],
        description: componentMeta.propDescriptions && componentMeta.propDescriptions[key]
      };
    }) : [])
    .reduce((accum, current)=>{
      accum[current.group] = accum[current.group] ? [ ...accum[current.group], current ] : [ current ];
      return accum;
    }, {});
    return groupComponentProperties;
  }

  renderInput(propTypeName, propType, value) {

    // Some special propTypeName

    switch (propTypeName) {
      case 'bsSize': {
        const bsSizeOptions = [ 'lg', 'large', 'sm', 'small', 'xs', 'xsmall' ];
        return (
          <Select
            value={ value }
            options={ bsSizeOptions.map(option => {
              return { label: option, value: option };
            }) }
            onChange={this.onSelectChange.bind(this, propTypeName)}
          />
        );
      }
      case 'bsStyle': {
        const bsStyleOptions = [ 'success', 'warning', 'danger', 'info', 'default', 'primary', 'link' ];
        return (
          <Select
            value={ value }
            options={ bsStyleOptions.map(option => {
              return { label: option, value: option };
            }) }
            onChange={this.onSelectChange.bind(this, propTypeName)}
          />
        );
      }
      default:
        break;
    }

    if (propType === PropTypes.bool || propType === PropTypes.bool.isRequired) {
      return <Checkbox defaultChecked={value} onChange={this.onCheckBoxChange.bind(this, propTypeName)}/>;
    } else if (propType === PropTypes.number || propType === PropTypes.number.isRequired) {
      return <FormControl type="number" value={value} onChange={this.onNumberInputChange.bind(this, propTypeName)}/>;
    } else if (propType === PropTypes.array || propType === PropTypes.array.isRequired) {
      return <MultiOptionsEdit options={value} onChange={this.onOptionsChange.bind(this, propTypeName)}/>;
    }
    return <FormControl type="text" value={value} onChange={this.onInputChange.bind(this, propTypeName)}/>;
  }

  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  render() {
    const { 
      editingComponentId,
      componentMeta
    } = this.props;
    const PanelHeader = (
      <span style={{ cursor: 'move' }}>
        <i className="fa fa-gear" />&nbsp;Properties
        <i className="fa fa-times pull-right"
          style={{ cursor: 'pointer' }}
          onClick={::this.onDismissComponentBuilderPrperties} />
      </span>
    );

    const groupComponentProperties = this.getGroupComponentProperties();
    const transparentBgStyle = { background: 'rgba(255,255,255,.7)' };

    return editingComponentId && (
      <Panel bsStyle="success" header={PanelHeader} style={transparentBgStyle}>
        <div style={{ maxHeight: 500, overflowY: 'auto' }}>
          <label>{componentMeta.widget.name}</label>
          <Form horizontal>
            {
              // <FormGroup>
              //   <Col sm={4}>
              //     Text
              //   </Col>
              //   <Col sm={8}>
              //     <FormControl
              //       type="text"
              //       disabled={typeof this.state.componentChildren === 'object'}
              //       value={this.state.componentChildren}
              //       onChange={this.onInputChange.bind(this, 'componentChildren')}/>
              //   </Col>
              // </FormGroup>
            }
            <PanelGroup accordion defaultActiveKey="basic">
              {
                Object.keys(groupComponentProperties)
                  .filter(key=>key !== 'ignore')
                  .map((key) => {
                    return (
                      <Panel header={this.capitalizeFirstLetter(key)} eventKey={key} key={key} style={transparentBgStyle}>
                        {
                          groupComponentProperties[key].map((property, index)=>{
                            return (
                              <FormGroup key={index}>
                                <Col sm={4}>
                                  {property.prop}
                                </Col>
                                <Col sm={8}>
                                  {
                                    this.renderInput(property.prop, property.type, this.state[property.prop])
                                  }
                                </Col>
                              </FormGroup>
                            );
                          })
                        }
                      </Panel>
                    );
                  }
                )
              }
            </PanelGroup>
          </Form>
        </div>
      </Panel>
    );
  }
}
