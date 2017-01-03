import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import './assets/sass/area_chart.scss';

class AreaChart extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
  }

  clear = () => {
    const svgDOM = ReactDOM.findDOMNode(this.refs.chart);
    d3.select(svgDOM).selectAll('*').remove();
  }

  draw = () => {
    const { data, width: parentWidth, height: parentHeight, color } = this.props;
    const svgDOM = ReactDOM.findDOMNode(this.refs.chart);

    var margin = { top: 30, right: 20, bottom: 30, left: 30 },
      width = parentWidth - margin.left - margin.right,
      height = parentHeight - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .domain([ 0, d3.max(data, d => d.x ) ])
        .range([ 0, width ]);

    var y = d3.scaleLinear()
        .domain([ 0, d3.max(data, d => d.y) ])
        .range([ height, 0 ]);

    var xAxis = d3.axisBottom()
        .scale(x);

    var yAxis = d3.axisLeft()
        .scale(y)
        .tickSizeOuter(0)
        .tickSizeInner(-width);

    var area = d3.area()
        .x(d => x(d.x))
        .y0(height)
        .y1(d => y(d.y));

    var svg = d3.select(svgDOM)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);
    
    svg.append('path')
        .datum(data)
        .attr('class', 'area')
        .attr('d', area)
        .attr('fill', color)
        .attr('opacity', 0.7);
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.clear();
      this.draw();
    }
  }

  render() {
    return (
      <svg className="area-chart" ref='chart' id={this.props.id} />
    );
  }

}

export default AreaChart;
