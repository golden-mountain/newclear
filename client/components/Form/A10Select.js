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

import { values, get, isArray, isEqual, set } from 'lodash';

class A10Select extends Component {
  static displayName = 'A10Select'

  static contextTypes = {
    props: PropTypes.object.isRequired
  }

  state = {
    options: []
  }

  formatOptions(data) {
    let json = [];
    if ( !data || !this.props.loadOptions) {
      return json;
    }
    let list = values(data).pop();

    if (!isArray(list)) {
      list = [ list ];
    }

    let { map: { name, label, reform } } = this.props.loadOptions;

    if (!name) {
      name = 'name';
    }

    if (!label) {
      label = name;
    }

    list.forEach((value) => {
      let title = get(value, label);
      if (reform) {
        title = reform(title);
      }
      json.push({ value: get(value, name), label: title });
    });
    return json;
  }

  getOptions() {
    const { loadOptions } = this.props;
    const asyncNeeded = loadOptions && loadOptions.url && true;

    if (asyncNeeded) {
      const { params } = loadOptions;
      const payload = getPayload(loadOptions.url, 'GET', params);
      this.props.comAxapiRequest(payload, false);
    }
  }

  getOnloadPopupOptions() {
    const { popupInfo } = this.props;
    let onLoad = get(popupInfo, 'connectOptions.onLoad');
    if (!onLoad) {
      onLoad = (value) => {
        let formattedOptions = this.formatOptions(value);
        let allOptions = this.state.options;
        allOptions = allOptions.concat(formattedOptions);
        this.setState( { options: allOptions });
        return formattedOptions;
      };
    }
    return onLoad;
  }

  componentWillMount() {
    // const { loadOptions: { loadOnMount } } = this.props;
    if ( this.props.loadOptions && this.props.loadOptions.loadOnMount ) {
      this.getOptions();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.data, this.props.data )) {
      const formattedOptions = this.formatOptions(nextProps.data);
      this.setState( { options: formattedOptions });
    }
  }

  render() {
    let { value, onChange, popupInfo } = this.props;
    // const asyncNeeded = loadOptions && loadOptions.url && true;

    const loadAttr = { value, onChange, options: this.state.options, simpleValue: true };

    set(popupInfo, 'connectOptions.onLoad', this.getOnloadPopupOptions());
    set(popupInfo, 'id', 'default');

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
