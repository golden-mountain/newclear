import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

import './assets/sass/application_status.scss';

class ApplicationStatus extends Component {

  static displayName = 'applicationStatus'

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          icon: 'asterisk',
          title: 'SSLi: ADP',
          subTitle: 'It works 3 minutes',
          btnIcon: 'repeat',
          status: 'success'
        },
        {
          icon: 'asterisk',
          title: 'SSLi: l2 single',
          subTitle: 'Not running up!',
          btnIcon: 'cog',
          status: 'normal'
        },
        {
          icon: 'asterisk',
          title: 'ADC: MS cloud',
          subTitle: 'Something wrong, <a href="${0}">see log</a>',
          options: [ '/#' ],
          btnIcon: 'repeat',
          status: 'warming'
        },
        {
          icon: 'asterisk',
          title: 'SSLi: ADP',
          subTitle: 'Application crashed!!',
          btnIcon: 'repeat',
          status: 'error'
        }
      ]
    };
  }

  convertSubTitle = (str, options) => {
    if (!options) return str;
    
    let result = '';
    for (let i = 0; i < options.length; i++) {
      result = str.replace(`\${${i}}`, options[i]);
    }
    return result;
  }

  render() {
    return (
      <div className="application-status-container">
        <div className="list-group mb0">
          {
            this.state.data.map((item, index) => (  
              <div key={index} className={`list-group-item list-group-item-${item.status}`}>
                <div>
                  <Glyphicon glyph={item.icon} />
                </div>
                <div>
                  <div className="title">{item.title}</div>
                  <div className="description" dangerouslySetInnerHTML={{ __html: this.convertSubTitle(item.subTitle, item.options) }} />
                </div>
                <div> 
                  <Glyphicon glyph={item.btnIcon} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
  
}

export default ApplicationStatus;
