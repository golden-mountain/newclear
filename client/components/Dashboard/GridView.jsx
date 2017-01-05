import React from 'react';

import './assets/gridview.scss';

function GridView(props) {
  const { className: customClassName, children } = props;
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

export default GridView;
