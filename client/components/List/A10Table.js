import React from 'react';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { Row, Col, Table, Pagination, Panel, Button, FormControl, InputGroup, Collapse } from 'react-bootstrap';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { getPayload, getPaginationParam } from 'helpers/axapiHelper';
import { values, get }  from 'lodash';
import { UPDATE_TARGET_DATA } from 'configs/messages';
import A10Button from 'components/Field/A10Button';

export class A10TableColumn extends React.Component {
}

class A10Table extends React.Component {
  static displayName = 'A10Table'

  state = {
    newElement: null
  }

  refreshTable() {
    let { schema, dispatch, env, params=getPaginationParam(), path } = this.props; // eslint-disable-line
    if (!path) {
      path = schema.axapi;
    }
    path = path.replace(/\/[^\/]+?$/, '');
    // axapiGet(path, params, env, dispatch);
    this.props.comAxapiRequest(getPayload(path, 'GET', params));
  }

  componentWillMount() {
    // console.log(this.props.instancePath);
    if (this.props.loadOnInitial) {
      this.refreshTable();
    }
    this.props.catchBall(UPDATE_TARGET_DATA, (from, to, params) => { //eslint-disable-line
      this.refreshTable();
      // console.log(params);
      const record = values(params).pop() || [];
      const newElement = this.renderData(record, 'new_1', 'success');
      this.setState({ newElement });
    }, this.props.instancePath);
  }

  renderData(data, index=10000, rowClass='') {
    let result = this.props.children.map((child, key) => {
      const { dataField, dataFormat, checkbox, ...props } = child.props;
      const dataCol = get(data, dataField);
      let formatedData = dataFormat ? dataFormat(dataCol, data) : dataCol;
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
      children, data=[], newLast, // eslint-disable-line
      responsive, striped, hover, bordered,
      actions: { create:popup }
    } = this.props;

    let ths = [], tds = [];

    if (data) {
      let list = values(data).pop() || [];
      // if (newLast && list.length) {
      //   const item = list.pop();
      //   list.unshift(item);
      //   // console.log(item, list);
      // }

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
    }

    return (
      <Panel>
        <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
          <Row>
            <Col md={6} >
              <InputGroup>
                <FormControl type="text" placeholder="Keywords" />
                <InputGroup.Button>
                  <Button bsStyle="default">Search</Button>
                </InputGroup.Button>
              </InputGroup>
            </Col>
            <Col md={6} >
              <A10Button bsClass="btn btn-labeled btn-success pull-right" popup={ popup } >
                <span className="btn-label"><i className="fa fa-plus"></i></span> Create
              </A10Button>
            </Col>
          </Row>
        </div>
        <Table  {...{ responsive, striped, bordered, hover }} >
          <thead>
            <tr>
              {ths}
            </tr>
          </thead>

          <Collapse in={!!this.state.newElement} transitionAppear={true} timeout={3000}>
            <tbody>
              { this.state.newElement }
            </tbody>
          </Collapse>

          <tbody>
            {tds || 'loading...' }
          </tbody>
        </Table>
        <div className="panel-footer">
            <Row>
                <Col lg={ 2 }>
                    <div className="input-group pull-right">
                        <select className="input-sm form-control">
                            <option value="0">Bulk action</option>
                            <option value="1">Delete</option>
                            <option value="2">Clone</option>
                            <option value="3">Export</option>
                        </select>
                        <span className="input-group-btn">
                          <button className="btn btn-sm btn-default">Apply</button>
                        </span>
                    </div>
                </Col>
                <Col lg={ 8 }></Col>
                <Col lg={ 2 } className="text-right">
                  <Pagination prev next items={data.length} maxButtons={3} bsSize="small" />
                </Col>
            </Row>
        </div>
      </Panel>

    );
  }
}

export default widgetWrapper([ 'app' ])(A10Table);
