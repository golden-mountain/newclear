import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PieChart from '../../chart/PieChart';

import './assets/sass/cpu_info.scss';

class Card extends Component {

  static displayName = 'cpuInfo'

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
      <div className="cup-info info-card">
        <div className="text-container">
          <div className="title">CPU</div>
          <div className="description">
            <div>8</div>
            <div>32C/89F</div>
          </div>
        </div>
        <div className="chart-container" ref="chartContainer">
          <PieChart {...this.state} />
        </div>
      </div>
    );
  }

}

export default Card;
