
// import CenterPoint from './center-point.js';
// import WebSpider from './web-spider.js';
import NetworkGraph from './networkGraph';

// import StandardLayout from './standardLayout';

// import BezierCurvePath from '../elements/BezierCurvePath';

import _ from 'lodash';

class Director {

  constructor(d3, id, svgPath) {
    this.d3 = d3;
    this.svgPath = svgPath;
    // 创建一个SVG，占据整个div
    this.scene = this.d3.select('#' + id).append('svg')
            .style('width', '100%')
            .style('height', '100%');
    // 获取SVG的宽
    this.width = parseInt(this.scene.style('width').replace('px', ''));
    // 获取SVG的高
    this.height = parseInt(this.scene.style('height').replace('px', ''));
    this.events = [];
  }

  addEvent(event) {
    if (typeof event === 'function') {
      this.events.push(event);
    }
  }

  touchClickEvent(node) {
    _.forEach(this.events, (event) => {
      if (typeof event === 'function') {
        event(node);
      }
    });
  }

  createNetworkGraph() {
    return new NetworkGraph(this);
  }

  // createBezierCurvePath() {
  //   const layout = new StandardLayout(this).create();
  //   return new BezierCurvePath(this, layout, {
  //     startPosition: { x: 0, y: 0 },
  //     endPosition: { x: 30, y: 30 },
  //     controlPositions: [
  //       { x: 10, y: 10 },
  //       { x: 15, y: 15 }
  //     ]
  //   } );
  // }

  // centerPoint () {
  //   // 创建一个中心点
  //   this.centerPoint = new CenterPoint(this);
  // }
  //
  // webSpider () {
  //   // 创建一个虚拟的蜘蛛网🕸️
  //   this.webSpider = new WebSpider(this);
  // }
}

export default Director;
