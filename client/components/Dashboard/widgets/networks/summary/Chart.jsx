import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AreaChart from '../../chart/AreaChart';

class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        { x: 0, y: 10 },
        { x: 1, y: 15 },
        { x: 2, y: 35 },
        { x: 3, y: 20 }
      ],
      width: 100,
      height: 100
    };
  }

  componentDidMount() {
    const chartContainerDOM = ReactDOM.findDOMNode(this.refs.chartContainer);
    const { width, height } = chartContainerDOM.getBoundingClientRect();
    this.setState({ width, height });
  }

  render() {
    const { data, width, height } = this.state;
    return (
      <div className='networks-summary-chart-container' ref="chartContainer">
        <AreaChart id="networks-summary-chart" data={data} width={width} height={height} color="#F4B53B" />
      </div>
    );
  }

}

export default Chart;
