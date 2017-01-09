import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import './assets/sass/pie_chart.scss';

class PieChart extends Component {

  static displayName = 'pieChart'

  constructor(props) {
    super(props);
  }

  draw = () => {
    const { width: parentWidth, height: parentHeight, color, fontColor } = this.props;
    const svgDOM = ReactDOM.findDOMNode(this.refs.chart);
    const r = 70;
    
    d3.select(svgDOM).selectAll('*').remove();
    var svg = d3.select(svgDOM)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', '0 0 320 180')
        .attr('width', parentWidth)
        .attr('height', parentHeight)
        .attr('preserveAspectRatio', 'none')
        .classed('svg-content-responsive', true);

    svg.append('circle')
      .attr('r', r)
      .attr('cx', 160)
      .attr('cy', 90)
      .attr('fill', color);

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .attr('x', 160)
      .attr('y', 90)
      .attr('fill', fontColor || '#8e8d8d')
      .style('font-size', '1.8em')
      .text('100%');
  }

  componentDidUpdate() {
    this.draw();
  }

  componentDidMount() {
    this.draw();
  }

  render() {
    return (
      <svg className='pie-chart' ref='chart' id={this.props.id} />
    );
  }

}

export default PieChart;
