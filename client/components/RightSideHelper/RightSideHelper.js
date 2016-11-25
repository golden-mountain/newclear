
import React, { Component, PropTypes } from 'react';

import './default.css';

class RightSideHelper extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render() {

    const { show } = this.props;
    const className = show
        ? 'properties-content-show'
        : 'properties-content-normal';

    return (
      <div className={ className }>
        { this.props.children }
      </div>
    );
  }
}

RightSideHelper.getComponentDefaultProps = () => {
  return {
    show: false
  };
};

export default RightSideHelper;
