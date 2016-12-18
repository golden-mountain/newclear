import React, { Component } from 'react';
import { widgetWrapper } from 'a10-widget';

import configApp from 'configs/app';
const OEM = configApp.OEM;
const StandardPageLayout = require('oem/' + OEM + '/PageLayout').default;

import * as d3 from 'd3';
import Director from '../Resource/graph/director';

import { sampleDescripton } from '../Resource/description';

class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      selected: undefined
    };
  }

  componentDidMount() {
    let director = new Director(
      d3,
      'dashboard-network-graph',
      '/Security/SSLi/Resource/svg/'
    );
    // director.centerPoint();

    const events = {
      'ax.svg': () => {
        this.setState({ selected: 'network' });
      }
    };

    director.addEvent(function (node) {
      const nodeEvent = events[node.type];
      nodeEvent && nodeEvent();
    });

    // let bezierCurvePath = director.createBezierCurvePath();
    // bezierCurvePath.draw();

    let networkGraph = director.createNetworkGraph();
    networkGraph.addSvg('security_device.svg', -161, -194);
    networkGraph.addSvg('ax.svg', -157, 90);

    networkGraph.addSvg('unlock.svg', -158.5, -100.5);
    networkGraph.addSvg('locked.svg', -348, 22);
    networkGraph.addSvg('locked.svg', 56, 22);

    networkGraph.addSvg('router.svg', 155.5, 85.5);
    networkGraph.addSvg('laptop.svg', -483, 92);
    networkGraph.addSvg('cloud.svg', 323, 60);

    networkGraph.addPath('M -420, 90, -300, 90');
    networkGraph.addPath('M -20, 90, 110, 90');
    networkGraph.addPath('M 200, 90, 250, 90');

    networkGraph.addPath('M -310, 50, L-310, -190, L-260, -190');
    networkGraph.addPath('M 0, 50, L0, -190, L-50, -190');
  }

  render() {
    return (
      <StandardPageLayout title="Dashboard">
        tests
        <div id="dashboard-network-graph"
          style={{
            width: '1100px',
            height: '500px',
            border: '1px solid #ddd'
          }}
        />
      <div>
        {this.state.selected === 'network' ? sampleDescripton.network : ''}
      </div>
      </StandardPageLayout>
    );
  }
}

export default widgetWrapper()(Dashboard);
