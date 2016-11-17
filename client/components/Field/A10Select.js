import React, { Component, PropTypes } from 'react';
import { InputGroup } from 'react-bootstrap';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

// Then import the virtualized Select HOC
import VirtualizedSelect from 'react-virtualized-select';

import A10Button from 'components/Field/A10Button';
// import { widgetWrapper } from 'helpers/widgetWrapper';
import { getPayload } from 'helpers/axapiHelper';

import { values, get, isArray } from 'lodash';
import { UPDATE_TARGET_DATA } from 'configs/messages';
import { COMPONENT_PAGE_SIZE } from 'configs/app';
// import FieldConnector from 'helpers/FieldConnector';


export default class A10Select extends Component {
  static displayName = 'A10Select'

  static contextTypes = {
    props: PropTypes.object,
    ballKicker: PropTypes.object
  }

  newValue = ''

  // constructor(props, context) {
  //   super(props, context);
  //   // console.log(this.context.props, this.props);
  // }

  componentWillUpdate() {
    const { instancePath, catchBall, modelSetValue } = this.context.props;
    const { popupInfo={} } = this.props.widgetProps || {};
    // console.log(popupInfo.connectTo);
    catchBall(UPDATE_TARGET_DATA, (from, to, body) => { //eslint-disable-line
      if (popupInfo.connectTo) {
        const value = get(body, popupInfo.connectTo);
        modelSetValue(value);
        // console.log('triggled::::::::::::::::', body, value);
      }
      // const { popupInfo: { connectOptions } } = this.props;
      // console.log(params, connectOptions);
      // const connect = (connectOptions, params) => {
      //
      // };
      // const fieldConnector = new FieldConnector(connectOptions, this.props.form, this.context.props.env);
      // console.log(connectOptions, from, to, params);
      this.getOptions();
      // this.newValue = 'a1';
      // fieldConnector.connectToValues(params);
    }, instancePath);
  }

  formatOptions(data) {
    const { loadOptions } = this.props.widgetProps || {};
    let json = [];
    if ( !data || !loadOptions) {
      return json;
    }
    let list = values(data).pop();

    if (!isArray(list)) {
      list = [ list ];
    }

    let { map: { name, label, reform } } = loadOptions;

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
    const { loadOptions={} } = this.props.widgetProps || {};
    let url = loadOptions.url;
    if (!url) {
      const fieldProps = this.context.props.modelGetFieldProps();
      if (fieldProps) url = fieldProps['$ref'];
    }
    if (url) {
      const { params={ start:0, count:COMPONENT_PAGE_SIZE } } = loadOptions;
      const payload = getPayload(url, 'GET', params);
      this.context.props.comAxapiRequest(payload, false);
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
    const { loadOptions={} } = this.props.widgetProps || {};
    if ( loadOptions.loadOnMount ) {
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
    let { value, data, onChange, widgetProps={} } = this.props;
    const { popupInfo } = widgetProps;
    const formattedOptions = this.formatOptions(data);
    const loadAttr = { value, onChange, options: formattedOptions, simpleValue: true };

    const { instancePath } = this.context.props;
    // console.log(this.props);
    // console.log(value, '..................value...............');

    return (
      popupInfo ?
      <InputGroup>
        <VirtualizedSelect {...loadAttr}/>
        <InputGroup.Addon>
          <A10Button popup={ popupInfo } componentClass="a" edit={false} parentPath={instancePath} ><em className="fa fa-plus"/></A10Button>
        </InputGroup.Addon>
      </InputGroup>
      :
      <VirtualizedSelect {...loadAttr}/>
    );
  }
}

// export default widgetWrapper([ 'app' ])(A10Select);
