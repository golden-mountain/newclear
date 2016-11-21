import React from 'react';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
// import { Row, Col, Table, Pagination, Panel, Button, FormControl, InputGroup, Collapse } from 'react-bootstrap';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { getPayload, getPaginationParam, getStartPage } from 'helpers/axapiHelper';
import { values, get }  from 'lodash';
import { UPDATE_TARGET_DATA } from 'configs/messages';
// import A10Button from 'components/Field/A10Button';

import configApp from 'configs/app';
const OEM = configApp.OEM;
const TableLayout = require('oem/' + OEM + '/TableLayout').default;

// A Place holder stands for one Col inside A10Table
export class A10TableColumn extends React.Component {}

class A10Table extends React.Component {
  static displayName = 'A10Table'

  state = {
    newElement: null
  }

  refreshTable() {
    let { schema, pagination={ size: configApp.COMPONENT_PAGE_SIZE }, path, location } = this.props;
    if (!path) {
      path = schema.axapi;
    }
    path = path.replace(/\/[^\/]+?$/, '');
    // axapiGet(path, params, env, dispatch);
    // console.log(this.context.props, this.props);
    const params = getPaginationParam(getStartPage(location)*pagination.size, pagination.size);
    const fullRequests = [
      getPayload(path, 'GET', { total: true }),
      getPayload(path, 'GET', params)
    ];
    this.props.comAxapiRequest(fullRequests);
  }

  componentWillMount() {
    // console.log(this.props.instancePath);
    if (this.props.loadOnInitial) {
      this.refreshTable();
    }
    this.props.catchBall(UPDATE_TARGET_DATA, (from, to, params) => { //eslint-disable-line
      this.refreshTable();
      // console.log(params);
      const record = values(params).pop() || null;
      if (record) {
        const newElement = this.renderData(record, 'new_1', 'success');
        this.setState({ newElement });
      }
    }, this.props.instancePath);
  }

  renderData(data, index=10000, rowClass='') {
    let result = this.props.children.map((child, key) => {
      const { dataField, dataFormat, checkbox, ...props } = child.props;
      const dataCol = get(data, dataField);
      let formatedData = typeof dataFormat == 'function' ? dataFormat(dataCol, data) : dataCol;
      if (checkbox) {
        formatedData = (
            <div className="checkbox c-checkbox">
              <label>
                <input type="checkbox" />
                <em className="fa fa-check"></em>
              </label>
            </div>
        );
      }

      return (<td key={key} {...props}>{formatedData}</td>);
    });
    return (<tr key={index} className={rowClass}>{result}</tr>);
  }


  render() {
    // console.log('rendering at a10table>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.props.data);
    let {
      children, data=[],
      responsive, striped, hover, bordered,
      actions={},
      pagination={ size: configApp.COMPONENT_PAGE_SIZE, total: 0, items: 0 },
      ...tableOptions
    } = this.props;

    let ths = [], tds = [];

    // refreshTable fetched data
    if (data && data[0] && data[0]['total-count']) {
      let list = values(data[1]).pop() || [];

      ths = children.map((child, key) => {
        let { children } = child.props;
        if (child.props.checkbox) {
          children = (
            <div data-toggle="tooltip" data-title="Check All" className="checkbox c-checkbox">
              <label>
                <input type="checkbox" />
                <em className="fa fa-check"></em>
              </label>
            </div>
          );
        }
        return (<th key={key}>{children}</th>);
      });

      // TODO: hookup checkbox data
      tds = list.map(::this.renderData);
      pagination.total = data[0]['total-count'];
      pagination.items = Math.ceil(data[0]['total-count']/pagination.size);
    }

    return (
      <TableLayout
        tableAttrs={{ responsive, striped, bordered, hover }}
        actions={actions}
        pagination={pagination}
        tableOptions={tableOptions}
        tds={tds}
        ths={ths}
        newTd={this.state.newElement}
      />
    );
  }
}

export default widgetWrapper([ 'app' ])(A10Table);
