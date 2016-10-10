import React, { Component, PropTypes } from 'react';
import { InputGroup } from 'react-bootstrap';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

// Then import the virtualized Select HOC
import VirtualizedSelect from 'react-virtualized-select';

import { A10Button } from 'components/Form/A10Button';
import { widgetWrapper } from 'helpers/stateHelper';
import { axapiGet } from 'helpers/axapiHelper';
// import { axapiRequest } from 'redux/modules/app/axapi';
import { values, get, set, isArray, isEqual } from 'lodash';

class A10Select extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { options: [] };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('next props:', nextProps, 'next state:', nextState);
    return !isEqual(nextState.options, this.state.options) || !isEqual(nextProps.value, this.props.value);
  }

  setOptions(json, values) {
    // console.log(values, '...............values at A10Select');
    let { map: { name, label, reform } } = this.props.loadOptions;

    if (!name) {
      name = 'name';
    } 

    if (!label) {
      label = name;
    }        

    values.forEach((value) => {
      // console.log(value, label, name);
      let title = get(value, label);
      if (reform) {
        title = reform(title);
      }
      json.push({ value: get(value, name), label: title });
      this.setState({ options: json });
    });
  }

  getOptions() {
    // console.log('loading................');
    const { dispatch, env, loadOptions } = this.props;
    const asyncNeeded = loadOptions && loadOptions.url && true;  

    if (asyncNeeded) {
      const { params } = loadOptions;
      let resp = axapiGet(loadOptions.url, params, env.page, dispatch);
      return resp.then(
        (result) => {
          let json = [];
          if (result.length) {
            values(result.pop().body).forEach( (list) => {
              isArray(list) && this.setOptions(json, list);
            });
          }
          // console.log('json value: ', json);
          this.setState({ options: json });
        },
        (error) => {
          console.log('error', error);
        }
      );
    }
  }

  getOnloadPopupOptions() {
    const { popupInfo } = this.props;
    let onLoad = get(popupInfo, 'connectOptions.onLoad');
    if (!onLoad) {
      onLoad = (value) => {
        // console.log('A10Select default onLoad');
        let json = this.state.options;
        return this.setOptions(json, values(value));
      };
    }
    return onLoad;
  }

  componentWillMount() {
    const { loadOptions: { loadOnMount } } = this.props;
    if ( loadOnMount ) {
      this.getOptions();
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  // }

  render() {
    let { value, onChange, popupInfo } = this.props;

    // const asyncNeeded = loadOptions && loadOptions.url && true;   
    const loadAttr = { value, onChange, options: this.state.options, simpleValue: true };

    set(popupInfo, 'connectOptions.onLoad', this.getOnloadPopupOptions());
    
    return (
      popupInfo ? 
      <InputGroup>
        <VirtualizedSelect {...loadAttr}/>
        <InputGroup.Addon>
          <A10Button popup={ popupInfo } componentClass="a">+</A10Button>
        </InputGroup.Addon>
      </InputGroup>
      :
      <VirtualizedSelect {...loadAttr}/>      
    );
  }
}

A10Select.contextTypes = {
  actions: PropTypes.object
};

export default widgetWrapper(A10Select);
