import React, { Component } from 'react';

import './assets/sass/summary.scss';

class Summary extends Component {

  static displayName = 'summary'

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="system-summary">
        <table>
          <tbody>
            <tr>
              <td>Product Type</td>
              <td>CFW</td>
            </tr>
            <tr>
              <td>TH2600</td>
              <td>4.1.1-P2 build 16</td>
            </tr>
            <tr>
              <td>HD Primary</td>
              <td>4.1.1-P2 Build 16(*)</td>
            </tr>
            <tr>
              <td>CF Secondary</td>
              <td>2.4.3-P8-SP3 Build 2</td>
            </tr>
            <tr>
              <td>Last Configured</td>
              <td>Apr-11-2002, 18:18</td>
            </tr>
            <tr>
              <td>Serial Number</td>
              <td>AX26051110290019</td>
            </tr>
            <tr>
              <td>Up Time</td>
              <td>3 days, 4 hrs, 59 mins</td>
            </tr>
            <tr>
              <td>Firmware Version</td>
              <td>0.0.0</td>
            </tr>
            <tr>
              <td>aFleX Version</td>
              <td>2.0.0</td>
            </tr>
            <tr>
              <td>aXAPI Version</td>
              <td>3.0</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

export default Summary;
