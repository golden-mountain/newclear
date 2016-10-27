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

import { values, get, isArray } from 'lodash';
import { UPDATE_TARGET_DATA } from 'configs/messages';

import FieldConnector from 'helpers/FieldConnector';


class A10Select extends Component {
  static displayName = 'A10Select'

  static contextTypes = {
    props: PropTypes.object,
    ballKicker: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
    console.log(this.context.props, this.props);
    this.props.catchBall(UPDATE_TARGET_DATA, (from, to, params) => { //eslint-disable-line
      const { popupInfo: { connectOptions } } = this.props;
      const fieldConnector = new FieldConnector(connectOptions, this.props.form, this.context.props.env);
      console.log(from, to, params);
      this.getOptions();
      // this.newValue = 'a1';
      fieldConnector.connectToValues(params);
    });
  }

  newValue = ''

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

  // getOnloadPopupOptions() {
  //   const { popupInfo } = this.props;
  //   let onLoad = get(popupInfo, 'connectOptions.onLoad');
  //   if (!onLoad) {
  //     onLoad = (value) => {
  //       let formattedOptions = this.formatOptions(value);
  //       let allOptions = this.state.options;
  //       allOptions = allOptions.concat(formattedOptions);
  //       this.setState( { options: allOptions });
  //       return formattedOptions;
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

  // componentWillReceiveProps(nextProps) {
  //   if (!isEqual(nextProps.data, this.props.data )) {
  //     const formattedOptions = this.formatOptions(nextProps.data);
  //     this.setState( { options: formattedOptions });
  //   }
  // }

  render() {
    let { value, data, onChange, popupInfo } = this.props;
    const formattedOptions = this.formatOptions(data);
    // console.log(data);
    // const asyncNeeded = loadOptions && loadOptions.url && true;
    // let setValue = this.newValue || value;
    // console.log('set to VirtualizedSelect value', setValue);
    const loadAttr = { value, onChange, options: formattedOptions, simpleValue: true };

    // set(popupInfo, 'connectOptions.onLoad', this.getOnloadPopupOptions());
    // set(popupInfo, 'id', 'default');

    return (
      popupInfo ?
      <InputGroup>
        <VirtualizedSelect {...loadAttr}/>
        <InputGroup.Addon>
          <A10Button popup={ popupInfo } componentClass="a" >+</A10Button>
        </InputGroup.Addon>
      </InputGroup>
      :
      <VirtualizedSelect {...loadAttr}/>
    );
  }
}

export default widgetWrapper()(A10Select);
