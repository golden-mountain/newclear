import React, { Component, PropTypes } from 'react';
import { InputGroup } from 'react-bootstrap';
import { values, get, isArray } from 'lodash';
import VirtualizedSelect from 'react-virtualized-select';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

import { A10Button } from './A10Button';
import { getPayload } from '../../../utils';

import { UPDATE_TARGET_DATA } from '../../../consts/messages';
// import { COMPONENT_PAGE_SIZE } from 'configs/app';
// import FieldConnector from 'helpers/FieldConnector';
const COMPONENT_PAGE_SIZE = 25;

export class A10Select extends Component {
  static displayName = 'A10Select'

  static contextTypes = {
    props: PropTypes.object,
    ballKicker: PropTypes.object
  }

  newValue = ''

  componentWillUpdate() {
    const { instancePath, catchBall, modelSetValue } = this.context.props;
    const { popupInfo={} } = this.props.widgetProps || {};
    // console.log(popupInfo.connectTo);
    catchBall(UPDATE_TARGET_DATA, (from, to, body) => { //eslint-disable-line
      if (popupInfo.connectTo) {
        const value = get(body, popupInfo.connectTo);
        modelSetValue(value);
      }
      this.getOptions();
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
    // console.log(this.context.props);
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

  componentWillMount() {
    const { loadOptions={} } = this.props.widgetProps || {};
    if ( loadOptions.loadOnMount ) {
      this.getOptions();
    }
  }

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
