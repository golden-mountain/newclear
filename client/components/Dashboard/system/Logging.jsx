import React, { Component } from 'react';

import './assets/sass/logging.scss';

class Logging extends Component {

  static displayName = 'loggin'

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          time: '10:00 AM',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
          status: 'error'
        },
        {
          time: '10:15 PM',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
          status: 'warming'
        }
      ]
    };
  }

  render() {
    return (
      <div className="logging-container">
        <div className="list-group mb0">
          {
            this.state.data.map((item, index) => (  
              <div key={index} className={`list-group-item list-group-item-${item.status}`}>
                <div>{item.time}</div>
                <div>{item.content}</div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
  
}

export default Logging;
