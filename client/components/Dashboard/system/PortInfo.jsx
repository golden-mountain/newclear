import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import './assets/sass/port_info.scss';

class PortInfo extends Component {

  static displayName = 'portInfo'

  constructor(props) {
    super(props);
    this.stateColor = {
      disable: '#666666',
      enable: '#00CC00',
      none: '#CCCCCC'
    };
    this.state = {
      data: {
        management: {
          status: 'enable'
        },
        ethernet: [
          { status: 'disable' },
          { status: 'none' },
          { status: 'none' },
          { status: 'disable' },
          { status: 'disable' },
          { status: 'disable' },
          { status: 'disable' },
          { status: 'disable' },
          { status: 'enable' },
          { status: 'enable' },
          { status: 'disable' },
          { status: 'disable' }
        ]
      }
    };
  }

  draw = () => {
    const containerDOM = ReactDOM.findDOMNode(this.refs.chartContainer);
    const { width: containerWidth, height: containerHeight } = containerDOM.getBoundingClientRect();

    const { data: { management, ethernet } } = this.state;
    const svgDOM = ReactDOM.findDOMNode(this.refs.chart);
    const mContainerWidth = 80;
    const interfaceWidth = 30;
    const interfaceHeight = 30;
    const interfaceMargin = 10;
    const borderRadius = 5;

    d3.select(svgDOM).selectAll('*').remove();
    var svg = d3.select(svgDOM)
              .attr('preserveAspectRatio', 'xMinYMin meet')
              .attr('viewBox', '0 0 325 95')
              .attr('width', containerWidth)
              .attr('height', containerHeight)
              .attr('preserveAspectRatio', 'none')
              .classed('svg-content-responsive', true);

    // management interface
    var mContainer = svg.append('g')
      .attr('width', mContainerWidth)
      .attr('transform', 'translate(25, 16)');
    mContainer.append('rect')
      .attr('width', interfaceWidth).attr('height', interfaceHeight)
      .attr('fill', this.stateColor[management.status])
      .attr('stroke', '#FFFFFF')
      .attr('rx', borderRadius)
      .attr('ry', borderRadius);
    mContainer.append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .attr('x', Math.round(interfaceWidth / 2))
      .attr('y', Math.round(interfaceHeight / 2))
      .attr('fill', '#FFFFFF')
      .text('M');

    // ethernet interface
    var eContainer = svg.append('g').attr('width', 244).attr('transform', `translate(${mContainerWidth}, 0)`);
    for (let i = 0, x = 0, y = 15; i < ethernet.length; i++, x+=interfaceWidth+interfaceMargin) {
      if (i > 0 && i % 6 === 0) {
        x = 0;
        y += interfaceHeight + interfaceMargin;
      }
      eContainer.append('rect')
        .attr('x', x).attr('y', y)
        .attr('width', interfaceWidth).attr('height', interfaceHeight)
        .attr('fill', this.stateColor[ethernet[i].status])
        .attr('stroke', '#FFFFFF')
        .attr('rx', borderRadius)
        .attr('ry', borderRadius);
      eContainer.append('text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'central')
        .attr('x', x + Math.round(interfaceWidth / 2))
        .attr('y', y + Math.round(interfaceHeight / 2))
        .attr('fill', '#FFFFFF')
        .text(i+1);
    }
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) this.draw();
  }

  render() {
    return (
      <div className="port-info info-card">
        <div className="text-container">
          <div className="title">Ports</div>
          <div className="description">12</div>
        </div>
        <div className="chart-container" ref="chartContainer">
          <svg ref="chart" />
        </div>
      </div>
    );
  }

}

export default PortInfo;
