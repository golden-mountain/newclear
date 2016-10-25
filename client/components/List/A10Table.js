import React from 'react';
import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { Col, Row } from 'react-bootstrap';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { getPayload } from 'helpers/axapiHelper';
import { values }  from 'lodash';

class A10Table extends React.Component {
  static displayName = 'A10Table'

  refreshTable(props) {
    const { schema, dispatch, env, params } = props; // eslint-disable-line
    let path = props.path;
    if (!path) {
      path = schema.axapi;
    }
    path = path.replace(/\/[^\/]+?$/, '');
    // axapiGet(path, params, env, dispatch);
    this.props.comAxapiRequest(getPayload(path, 'GET'));
  }

  componentWillMount() {
    this.refreshTable(this.props);
  }

  tidyData(data) {
    let result = data;
    return result;
  }

  render() {
    // console.log(this.props.comSetComponentData('dkdkdkdkdkdkkddkdkkd'));
    let { fieldMap, actions, schema, children } = this.props; // eslint-disable-line
    let selectRowProp = {
      mode: 'checkbox', // or checkbox
      clickToSelect: true
    };

    let options = {
      onDeleteRow: () => {console.log('deleting row');},
      onAddRow: () => {console.log('adding row');}
    };

    return (
      <Row>
        <Col xs={12}>
          <BootstrapTable data={values(this.props.data).pop() || [] } search={true} insertRow={true}
            deleteRow={true} selectRow={selectRowProp} pagination={true} options={options}
            striped={true} hover={true} condensed={true}
            >
            {children}
          </BootstrapTable>

        </Col>
      </Row>
    );
  }
}

export default widgetWrapper()(A10Table);
