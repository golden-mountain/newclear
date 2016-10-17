import React from 'react';
import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { Col, Row } from 'react-bootstrap';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { axapiGet } from 'helpers/axapiHelper';
import { values }  from 'lodash';

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
    // console.log('path.....', path);
    let resp = axapiGet(path, params, env.page, dispatch);
    resp.then((result) => {
      // console.log('result..............', values(result[0].body).pop());
      let data = this.tidyData(values(result[0].body).pop());
      this.setState({ data });
    });
  }

  tidyData(data) {
    let result = data;
    return result;
  }

  render() {
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
          <BootstrapTable data={this.state.data}  search={true} insertRow={true} 
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

export default widgetWrapper(A10Table);
