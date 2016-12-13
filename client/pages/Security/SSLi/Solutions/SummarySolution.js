import React, { Component } from 'react';

import '../Resource/asset.scss';

import configApp from 'configs/app';
const OEM = configApp.OEM;
const StandardPageLayout = require('oem/' + OEM + '/PageLayout').default;
import { widgetWrapper } from 'a10-widget';

import { Table } from 'react-bootstrap';

const matas = [
  { name: 'Cache', params: '10G', suggession: 'Down/Up suggession' },
  { name: 'SSL', params: '1000/Min', suggession: 'Reencrypt speed need improve' },
  { name: 'Request', params: '1000 Per min', suggession: 'Requests Too Much' },
  { name: 'Response', params: '100G Per min', suggession: 'Reponses and Request not match' },
  { name: 'Errors', params: '1000', suggession: 'Errors too much' }
];

class SummarySolution extends Component {

  render() {
    return (
      <StandardPageLayout title="Summary">
        <div className="showstand">
          <div className="title">{'Part1: Summary'}</div>
          <p>Here is the description which can tell customer what's the feature given to them, and some suguession how to improvement, here we fetch some critical params to figure out what's need to improve</p>

          <Table responsive>
            <thead>
              <tr>
                <td style={{ width: '20%' }} />
                <td style={{ width: '40%' }}>Params</td>
                <td style={{ width: '40%' }}>Suggession</td>
              </tr>
            </thead>
            <tbody>
              {matas.map((mata, index) => {
                return (
                  <tr key={index}>
                    <td>{mata.name}</td>
                    <td>{mata.params}</td>
                    <td>{mata.suggession}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <div className="title">{'Part2: Charts'}</div>

          <div className="title">{'Part3: Important Pperations(Audit)'}</div>

          <div className="title">{'Part4: Alert Logs'}</div>
        </div>
      </StandardPageLayout>
    );
  }
}

export default widgetWrapper()(SummarySolution);
