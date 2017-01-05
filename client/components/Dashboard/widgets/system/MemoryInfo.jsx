import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PieChart from '../chart/PieChart';

import './assets/sass/memory_info.scss';

class MemoryInfo extends Component {

  static displayName = 'memoryInfo'

  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
      fontColor: '#FFFFFF',
      color: '#FFCC00'
    };
  }

  componentDidMount() {
    const chartContainerDOM = ReactDOM.findDOMNode(this.refs.chartContainer);
    const { width, height } = chartContainerDOM.getBoundingClientRect();
    this.setState({ width, height });
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
        <div className="chart-container" ref="chartContainer">
          <PieChart {...this.state} />
        </div>
      </div>
    );
  }

}

export default MemoryInfo;
