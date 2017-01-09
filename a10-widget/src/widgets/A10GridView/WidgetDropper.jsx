import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

import { itemType } from './Constants';

class WidgetDropper extends Component {
  
  static displayName = 'WidgetDropper'

  static propTypes = {
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    boxIndex: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div>{this.props.children}</div>
    );
  }

}

const spec = {
  canDrop() {
    return true;
  },

  drop(props) {
    return props;
  },

  hover() {
    // console.log('hover');
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }) ,
    canDrop: monitor.canDrop()
  };
}

export default DropTarget(itemType.WIDGET, spec, collect)(WidgetDropper);
