import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Popover, OverlayTrigger } from 'react-bootstrap';

import { widgetWrapper } from 'a10-widget';
import OKurl from './assets/licensed/img/ok.png';
import './assets/licensed/sass/index.scss';

class Licensed extends Component {

  static displayName = 'Licensed'

  constructor(props) {
    super(props);
  }

  popoverCreator = content => {
    return (
      <Popover id="popover-licensed-content">{content}</Popover>
    );
  }

  changeTitleColor = (index, isHover) => {
    const licesedDOM = ReactDOM.findDOMNode(this.refs[`licensed${index}`]);
    const title = licesedDOM.querySelector('.title');
    title.setAttribute('style', 'color: ' + (isHover ? '#428bca' : 'black'));
  }

  render() {
    const data = [
      {
        title: 'ADC',
        content: 'This is ADC'
      },
      {
        title: 'Security',
        content: 'This is Security'
      },
      {
        title: 'GSLIB',
        content: 'This is GSLIB'
      },
      {
        title: 'DDoS',
        content: 'This is DDoS'
      }
    ];
    return (
      <div className="licensed-container">
        <label>Licensed</label>
        <div className="icon-row">
          {
            data.map((item, index) => (
              <OverlayTrigger key={index}
                placement="bottom"
                overlay={this.popoverCreator(item.content)}
                onEntered={this.changeTitleColor.bind(this, index, true)}
                onExit={this.changeTitleColor.bind(this, index, false)} >
                <div ref={`licensed${index}`}>
                  <div className="icon-container">
                    <div className="dummy-icon"></div>
                    <img className="ok" src={OKurl} />
                  </div>
                  <div className="title">{ item.title }</div>
                </div>
              </OverlayTrigger>
            ))
          }
        </div>
      </div>
    );
  }
}

export default widgetWrapper()(Licensed);
