import React, { Component, PropTypes } from 'react';
import { InputGroup } from 'react-bootstrap';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

// Then import the virtualized Select HOC
import VirtualizedSelect from 'react-virtualized-select';

import A10Button from 'components/Form/A10Button';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { getPayload } from 'helpers/axapiHelper';
// import { axapiGet } from 'helpers/axapiHelper';
// import { axapiRequest } from 'redux/modules/app/axapi';
import { values, get, isArray } from 'lodash';

class A10Select extends Component {
  static displayName = 'A10Select'

  static contextTypes = {
    props: PropTypes.object.isRequired
  }

  // constructor(props, context) {
  //   super(props, context);
  //   // this.state = { options: [] };
  // }

  // // shouldComponentUpdate(nextProps, nextState) {
  // //   // console.log('next props:', nextProps, 'next state:', nextState);
  // //   return !isEqual(nextState.options, this.state.options) || !isEqual(nextProps.value, this.props.value);
  // // }

  formatOptions(values) {
    let json = [];
    if (!this.props.loadOptions || !isArray(values)) {
      return json;
    }
    
    let { map: { name, label, reform } } = this.props.loadOptions;

    if (!name) {
      name = 'name';
    } 

    if (!label) {
      label = name;
    }        

    values.forEach((value) => {
      let title = get(value, label);
      if (reform) {
        title = reform(title);
      }
      json.push({ value: get(value, name), label: title });
    });
    return json;
  }

  getOptions() {
    // console.log('loading................');
    const { loadOptions } = this.props;
    const asyncNeeded = loadOptions && loadOptions.url && true;  

    if (asyncNeeded) {
      const { params } = loadOptions;
      const payload = getPayload(loadOptions.url, 'GET', params);
      this.props.componentAxapiRequest(payload, false);      
    }
  }

  // getOnloadPopupOptions() {
  //   const { popupInfo } = this.props;
  //   let onLoad = get(popupInfo, 'connectOptions.onLoad');
  //   if (!onLoad) {
  //     onLoad = (value) => {
  //       // console.log('A10Select default onLoad');
  //       let json = this.state.options;
  //       return this.setOptions(json, values(value));
  //     };
  //   }
  //   return onLoad;
  // }

  componentWillMount() {
    // const { loadOptions: { loadOnMount } } = this.props;
    if ( this.props.loadOptions && this.props.loadOptions.loadOnMount ) {
      this.getOptions();
    }
  }

  // // componentWillReceiveProps(nextProps) {
  // //   console.log(nextProps);
  // // }

  render() {
    let { value, onChange, popupInfo, data } = this.props;
    let formattedOptions = [];

    // const asyncNeeded = loadOptions && loadOptions.url && true;   
    if (data) {
      formattedOptions = this.formatOptions(values(data).pop());
    }
    console.log('props...........................', formattedOptions);

    const loadAttr = { value, onChange, options:formattedOptions, simpleValue: true };

    // set(popupInfo, 'connectOptions.onLoad', this.getOnloadPopupOptions());
    
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
