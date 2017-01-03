import React, { Component } from 'react';

import './assets/sass/memory_info.scss';

class MemoryInfo extends Component {

  static displayName = 'memoryInfo'

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="memory-info info-card">
        <div className="text-container">
          <div className="title">Memory</div>
          <div className="description">
            <div>1.5G</div>
            <div>total: 10G</div>
          </div>
        </div>
        <div className="chart-container">
          qq
        </div>
      </div>
    );
  }

}

export default MemoryInfo;
