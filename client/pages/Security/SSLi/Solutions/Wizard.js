import React, { Component } from 'react';
import { widgetWrapper } from 'a10-widget';

import { Nav, NavItem } from 'react-bootstrap';

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
      selectedKey: 'network'
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
      'laptop.svg': () => {
        this.setState({ selectedKey: 'network' });
      },
      'ax.svg': () => {
        this.setState({ selectedKey: 'system' });
      },
      'router.svg': () => {
        this.setState({ selectedKey: 'internal' });
      }
    };

    director.addEvent(function (node) {
      console.log(node.type);
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

  handleSelect(eventKey) {
    this.setState({ selectedKey: eventKey });
  }

  render() {
    return (
      <StandardPageLayout title="Wizard">

        <div id="dashboard-network-graph"
          style={{
            width: '1100px',
            height: '500px',
            border: '1px solid #ddd',
            backgroundColor: '#fff'
          }}
        />
        <br />
        <Nav bsStyle="tabs" activeKey={this.state.selectedKey} onSelect={::this.handleSelect}>
          <NavItem eventKey="network">Network</NavItem>
          <NavItem eventKey="system">System</NavItem>
          <NavItem eventKey="internal">Internal</NavItem>
        </Nav>
        <div style={{ width: '1100px', padding: '8px', backgroundColor: '#fff' }}>
          <div>{ this.state.selectedKey === 'network' ? sampleDescripton.network : ''}</div>
          <div>{ this.state.selectedKey === 'system' ? sampleDescripton.system : ''}</div>
          <div>{ this.state.selectedKey === 'internal' ? sampleDescripton.internal : ''}</div>
        </div>

      </StandardPageLayout>
    );
  }
}

export default widgetWrapper()(Dashboard);
