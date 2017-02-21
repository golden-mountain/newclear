import React from 'react';
import { values, get }  from 'lodash';

// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
// import { Row, Col, Table, Pagination, Panel, Button, FormControl, InputGroup, Collapse } from 'react-bootstrap';
import { widgetWrapper } from '../../widgetWrapper';
import { getPayload, getPaginationParam, getStartPage, getNextPageURL } from '../../utils';
import { UPDATE_TARGET_DATA } from '../../consts/messages';
import { REDIRECT_ROUTE } from '../../consts/messages'; // eslint-disable-line

import TableLayout from '../../layouts/TableLayout';

// A Place holder stands for one Col inside A10Table
export class A10TableColumn extends React.Component {}

const COMPONENT_PAGE_SIZE = 25;
class _A10Table extends React.Component {
  static displayName = 'A10Table'

  state = {
    newElement: null
  }

  constructor(props, context) {
    super(props, context);
    if (this.props.pageMode) {
      this.state = {
        activePage: getStartPage(location)+1
      };
    } else {
      this.state = {
        activePage: 1
      };
    }
  }

  refreshTable(pageNo=0) {
    let { schema, pagination={ size: COMPONENT_PAGE_SIZE }, path } = this.props;
    if (!path) {
      path = schema.axapi;
    }
    path = path.replace(/\/[^\/]+?$/, '');

    let params;
    if (pageNo) {
      params = getPaginationParam((pageNo-1)*pagination.size, pagination.size);
    }

    const fullRequests = [
      getPayload(path, 'GET', { total: true }),
      getPayload(path, 'GET', params)
    ];
    this.props.comAxapiRequest(fullRequests);
  }

  componentWillMount() {
    // console.log(this.props.instancePath);
    if (this.props.loadOnInitial && !this.props.isComponentEditor) {
      this.refreshTable(this.state.activePage);
    }
    this.props.catchBall(UPDATE_TARGET_DATA, (from, to, params) => { //eslint-disable-line
      this.refreshTable(this.state.activePage);
      // console.log(params);
      const record = values(params).pop() || null;
      if (record) {
        const newElement = this.renderData(record, 'new_1', 'success');
        this.setState({ newElement });
      }
    }, this.props.instancePath);
  }

  renderData(data, index=10000, rowClass='') {
    // console.log(data);
    let result = this.props.children.map((child, key) => {
      const { dataField, dataFormat, checkbox, ...props } = child.props;
      const dataCol = get(data, dataField);
      let formatedData = typeof dataFormat == 'function' ? dataFormat(dataCol, data) : dataCol;
      // console.log(dataField, dataCol);
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

  paginate(pageNo) {
    this.setState({
      activePage: pageNo
    });
    // console.log(this.props);
    if (this.props.pageMode) {
      this.props.kickBall(REDIRECT_ROUTE, getNextPageURL(location, pageNo));
    } else {
      this.refreshTable(pageNo);
    }
  }

  render() {
    // console.log('rendering at a10table>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.props.data);
    let {
      children, data=[],
      responsive, striped, hover, bordered,
      actions={},
      pagination={ size: COMPONENT_PAGE_SIZE, total: 0, items: 0 },
      ...tableOptions
    } = this.props;

    let ths = [], tds = [];
    ths = children.map((child, key) => {
      if (!child || !child.props) return null;
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

    // refreshTable fetched data
    if (data && data[0] && data[0]['total-count']) {
      let list = values(data[1]).pop() || [];

      // TODO: hookup checkbox data
      // console.log('------------------------start---------------------');
      tds = list.map(::this.renderData);
      // console.log('-------------------------end--------------------');
      // console.log(tds);
      pagination.total = data[0]['total-count'];
      pagination.items = Math.ceil(data[0]['total-count']/pagination.size);
    }

    return (
      <TableLayout
        tableAttrs={{ responsive, striped, bordered, hover }}
        actions={actions}
        pagination={{ paginate: ::this.paginate, activePage: this.state.activePage, ...pagination }}
        tableOptions={tableOptions}
        tds={tds}
        ths={ths}
        newTd={this.state.newElement}
      />
    );
  }
}

export const A10Table = widgetWrapper([ 'app' ])(_A10Table);
