import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PieChart from '../chart/PieChart';

import './assets/sass/disk_info.scss';

class DiskInfo extends Component {

  static displayName = 'diskInfo'

  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
      color: '#FFFFFF'
    };
  }

  componentDidMount() {
    const chartContainerDOM = ReactDOM.findDOMNode(this.refs.chartContainer);
    const { width, height } = chartContainerDOM.getBoundingClientRect();
    this.setState({ width, height });
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
        <div className="chart-container" ref="chartContainer">
          <PieChart {...this.state} />
        </div>
      </div>
    );
  }

}

export default DiskInfo;
