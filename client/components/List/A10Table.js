import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';  // in ECMAScript 6
import { Col, Row } from 'react-bootstrap';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { axapiGet } from 'helpers/axapiHelper';
import { values }  from 'lodash';
import Link from 'react-router/Link';


class A10Table extends React.Component {
  state = {
    data: []
  }

  componentWillMount() {
    const { schema, dispatch, env, params } = this.props; // eslint-disable-line
    let path = this.props.path;
    if (!path) {
      path = schema.axapi;
    }
    path = path.replace(/\/[^\/]+?$/, '');
    console.log('path.....', path);
    let resp = axapiGet(path, params, env.page, dispatch);
    resp.then((result) => {
      console.log('result..............', values(result[0].body).pop());
      let data = this.tidyData(values(result[0].body).pop());
      this.setState({ data });
    });
  }

  tidyData(data) {
    let result = data;
    return result;
  }

  render() {
    const { fieldMap, actions, options, schema } = this.props; // eslint-disable-line
    let selectRowProp = {
      mode: 'checkbox', // or checkbox
      clickToSelect: true
    };

    const formatStat = (cell) => {
      return cell.toUpperCase();
    };

    const formatName = (cell) => {
      return <Link to={`/adc/virtual-server/edit/${cell}`} >{cell}</Link>;
    };

    return (
      <Row>
        <Col xs={12}>
          <BootstrapTable data={this.state.data}  search={true} insertRow={true} deleteRow={true} selectRow={selectRowProp} pagination={true}>
            <TableHeaderColumn dataField="enable-disable-action" dataSort={true} width="100" dataFormat={formatStat} >Enable</TableHeaderColumn>
            <TableHeaderColumn dataField="name" isKey={true} dataSort={true} width="300" dataFormat={formatName}>Name</TableHeaderColumn>
            <TableHeaderColumn dataField="ip-address" dataSort={true}>IP Address</TableHeaderColumn>
          </BootstrapTable>
          
        </Col>
      </Row>
    );
  }
}

export default widgetWrapper(A10Table);
