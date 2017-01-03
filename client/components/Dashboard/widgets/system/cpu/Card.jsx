import React, { Component } from 'react';

import './assets/sass/cpu_info.scss';

class Card extends Component {

  static displayName = 'cpuInfo'

  constructor(props) {
    super(props);
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
        <div className="chart-container">
          qq
        </div>
      </div>
    );
  }

}

export default Card;
