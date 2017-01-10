import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import VirtualServerForm from 'pages/ADC/VirtualServer/components/Form';
import slbVirtualServerSchema from 'slb-virtual-server.json';
// import { widgetWrapper } from 'helpers/widgetWrapper';
import { Schema } from 'a10-widget-lib';

import { A10Button, A10Table, A10TableColumn, widgetWrapper } from 'a10-widget';

class VirtualServiceTable extends React.Component {
  static displayName = 'VirtualServiceTable'

  render() {

    const formatStat = (cell) => {
      return cell && cell.toUpperCase();
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
      let pop = cloneDeep(popupInfo);
      pop.endpoint = Schema.getAxapiURL(slbVirtualServerSchema.axapi, { name: cell });
      pop.edit = true;
      pop.modalProps.title = 'Edit Virtual Server';
      // console.log(cell, '..........');
      return (<A10Button popup={ pop } componentClass="a" >{cell}</A10Button>);
    };

    const formatIp = (cell, row) => row['netmask'] ? `${cell} ${row['netmask']}` : cell;

    return (
      <Row>
        <Col xs={12}>
          <A10Table actions={actions} schema={slbVirtualServerSchema} pageMode responsive striped hover newLast loadOnInitial >
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

export default widgetWrapper()(VirtualServiceTable);
