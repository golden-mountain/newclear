import React from 'react';
import { Col, Row } from 'react-bootstrap';
// import { TableHeaderColumn } from 'react-bootstrap-table';  // in ECMAScript 6

import A10Table, { A10TableColumn } from 'components/List/A10Table';

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

    const options = {

    };

    const formatStat = (cell) => {
      return cell.toUpperCase();
    };

    const popupInfo = {
      componentClass: VirtualServerForm,
      modalProps: {
        title: 'Create Virtual Server',
        bsSize:'super'
        // componentClassName: 'super-large-modal'
      },
      connectOptions: {
        connectToValue: {
          'virtual-server': {
            'template-virtual-server': 'virtual-server.name'
          }
        }
      }
    };


    const actions = {
      create: Object.assign({}, popupInfo)
    };

    const formatName = (cell) => {
      popupInfo.urlParams = {
        'virtual-server': {
          name: cell
        }
      };

      popupInfo.edit = true;
      popupInfo.modalProps.title = 'Edit Virtual Server';
      
      return <A10Button popup={ popupInfo } componentClass="a">{cell}</A10Button>;
      // return <Link to={`/adc/virtual-server/edit/${cell}`} >{cell}</Link>;
    };

    const formatIp = (cell, row) => row['netmask'] ? `${cell} ${row['netmask']}` : cell;

    return (
      <Row>
        <Col xs={12}>
          <A10Table fieldMap={fieldMap} actions={actions} options={options} schema={slbVirtualServerSchema} responsive striped hover newLast loadOnInitial >
            <A10TableColumn dataField="name" checkbox style={{ width:'20px' }}  />
            <A10TableColumn dataField="enable-disable-action" style={{ width:'80px' }} dataFormat={formatStat} >Enable</A10TableColumn>
            <A10TableColumn dataField="name" style={{ width:'30%' }} dataFormat={formatName}>Name</A10TableColumn>
            <A10TableColumn dataField="ip-address" dataFormat={formatIp}>IP Address</A10TableColumn>
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
