import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { TableHeaderColumn } from 'react-bootstrap-table';  // in ECMAScript 6

import A10Table from 'components/List/A10Table';

// import AppManager from 'helpers/AppManager';
// import BaseTable from 'pages/BaseTable';
// import Link from 'react-router/Link';
import A10Button from 'components/Form/A10Button';
import VirtualServerForm from 'pages/ADC/VirtualServer/components/Form';
import slbVirtualServerSchema from 'schemas/slb-virtual-server.json';
import { widgetWrapper } from 'helpers/widgetWrapper';

class VirtualServerTable extends React.Component { 
  static displayName = 'VirtualServerTable'

  render() {
    const fieldMap = {

    };

    const actions = {

    };


    const options = {

    };

    const formatStat = (cell) => {
      return cell.toUpperCase();
    };

    const formatName = (cell) => {
      let popupInfo = {
        pageClass: VirtualServerForm,
        urlKeysConnect: [ 'virtual-server.name' ],
        title: 'Create Virtual Server',
        // pageName: 'virtual-server-edit',
        id: cell,
        bsSize:'lg'
        // connectOptions: {
        //   connectToValue: {
        //     'virtual-server.port-list': {
        //       'port-number': 'port.port-number',
        //       'range': 'port.range',
        //       'protocol': 'port.protocol'
        //     }
        //   },
        //   connectToApiStore: {
        //     targetIsArray: true,
        //     target: 'virtual-server.port-list',
        //     source: 'port'
        //   }
        // }
      };      
      return <A10Button popup={ popupInfo } componentClass="a">{cell}</A10Button>;
      // return <Link to={`/adc/virtual-server/edit/${cell}`} >{cell}</Link>;
    };

    const formatIp = (cell, row) => row['netmask'] ? `${cell} ${row['netmask']}` : cell;

    return (
      <Row>
        <Col xs={12}>
          <A10Table fieldMap={fieldMap} actions={actions} options={options} schema={slbVirtualServerSchema} >
            <TableHeaderColumn dataField="enable-disable-action" dataSort={true} width="100" dataFormat={formatStat} >Enable</TableHeaderColumn>
            <TableHeaderColumn dataField="name" isKey={true} dataSort={true} width="300" dataFormat={formatName}>Name</TableHeaderColumn>
            <TableHeaderColumn dataField="ip-address" dataSort={true} dataFormat={formatIp}>IP Address</TableHeaderColumn>
          </A10Table>
        </Col>
      </Row>
    );
  }
}

// export default AppManager({
//   page: 'virtual-server-list'
// })(VirtualServerTable);

export default widgetWrapper()(VirtualServerTable);
