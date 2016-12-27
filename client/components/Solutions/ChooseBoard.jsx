import React, { Component } from 'react';

import './assets/sass/index.scss';

class ChooseBoard extends Component {

  constructor(props) {
    super(props);
  }

  renderSolution(data) {
    const colors = [ 'primary', 'warning', 'default', 'success', 'info', 'danger' ];
    return data.map((solution, index) => (
      <button type="button" className={`btn btn-${colors[index % 7]} btn-xs`}>{solution.name}</button>
    ));
  }

  renderApplicationItem(data) {
    return data.map((application, index) => (
      <div className="col-md-4" key={index}>
        <div className="">
          <div className="caption">
            <h4>{application.name}</h4>
            <p>{application.description}</p>
            <div className="sub-title">
              <span className="glyphicon glyphicon-thumbs-up"/>Deploy Solutions:
            </div>
            <div className="solution-row">{this.renderSolution(application.solutions)}</div>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const data = this.props.data.reduce((prev, item) => {
      if (prev[prev.length - 1].length >= 3) {
        prev.push([ item ]);
      } else {
        prev[prev.length - 1].push(item);
      }
      return prev;
    }, [ [] ]);

    return (
      <div className="solution-choose-board">
        <h5>Choose App you want to deploy on this device</h5>
        <div className="application-container">
          {
            data.map((row, index) => (
              <div key={index} className="row">{this.renderApplicationItem(row)}</div>
            ))
          }
        </div>
      </div>
    );
  }

}

ChooseBoard.defaultProps = {
  data: [
    {
      name: 'ADC Application',
      description: 'Thunder ADC enables applications to be highly available, accelerated and secure, delivering exceptional performance in a variety of software and hardware appliances.',
      solutions: [
        { name: 'Solution A' },
        { name: 'Solution B' },
        { name: 'Solution C' },
        { name: 'Solution D' }
      ]
    },
    {
      name: 'SSLi Application',
      description: 'SSL encrypted traffic is growing, rendering most security devices ineffective.Gain visibility into encrypted traffic with SSL Insight and stop potential threats.',
      solutions: [
        { name: 'Solution A' },
        { name: 'Solution B' },
        { name: 'Solution C' },
        { name: 'Solution D' }
      ]
    },
    {
      name: 'CGN Application',
      description: 'The Thunder CGN line of Carrier Grade Networking gateways preserves your IPv4 addresses and provides a seamless migration to IPv6 networks with the lowest TCO',
      solutions: [
        { name: 'Solution A' },
        { name: 'Solution B' },
        { name: 'Solution C' },
        { name: 'Solution D' }
      ]
    },
    {
      name: 'GIFW Application',
      description: 'Thunder CFW combines a Secure Web Gateway, Data Center Firewall, Gi/SGi Firewall and IPsec VPN together and leverages the ACOS Harmony platform to deliver outstanding performance.',
      solutions: [
        { name: 'Solution A' },
        { name: 'Solution B' },
        { name: 'Solution C' },
        { name: 'Solution D' }
      ]
    },
    {
      name: 'CFW Application',
      description: 'Thunder CFW will streamline your network by consolidating security and application networking into a single, high-performance solution.',
      solutions: [
        { name: 'Solution A' },
        { name: 'Solution B' },
        { name: 'Solution C' },
        { name: 'Solution D' }
      ]
    }
  ]
};

export default ChooseBoard;
