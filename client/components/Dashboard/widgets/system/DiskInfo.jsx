import React, { Component } from 'react';

import './assets/sass/disk_info.scss';

class DiskInfo extends Component {

  static displayName = 'diskInfo'

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="disk-info info-card">
        <div className="text-container">
          <div className="title">Disk</div>
          <div className="description">
            <div>10G</div>
            <div>Total:  100G</div>
          </div>
        </div>
        <div className="chart-container">
          qq
        </div>
      </div>
    );
  }

}

export default DiskInfo;
