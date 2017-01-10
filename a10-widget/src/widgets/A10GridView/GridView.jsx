import React, { Component } from 'react';

import { widgetWrapper } from '../../widgetWrapper';
import './assets/gridview.scss';

class GridView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { className: customClassName, children } = this.props;
    const className = 'a10-grid ' + (customClassName || '');
    return (
      <div className={className}>
        {
          children.map((itemNode, index) => {
            const width = itemNode.props.width || '100';
            return (
              <div key={index} className={`item-${width}`}>{itemNode}</div>
            );
          })
        }
      </div>
    );
  }

}

export default widgetWrapper([ 'app' ])(GridView);
