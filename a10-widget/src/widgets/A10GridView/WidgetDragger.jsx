import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';

import { itemType } from './Constants';

class WidgetDragger extends Component {

  static displayName = 'WidgetDragger'

  static propTypes = {
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    // width: PropTypes.any.isRequired,
    children: PropTypes.node.isRequired,
    widgetIndex: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { connectDragSource, isDragging, children } = this.props;
    return connectDragSource(
      <div className='widget-container'
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move'
        }} >
        {children}
      </div>
    );
  }

}

const spec = {
  beginDrag: props => {
    return props;
  },
  endDrag: (props, mointor) => {
    const dropResult = mointor.getDropResult();
    if (!dropResult) return;
    const { widgetIndex, changeWidgetOrder } = props;
    const { boxIndex } = dropResult;
    changeWidgetOrder(widgetIndex, boxIndex);
  }
  // canDrag
  // isDragging
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

export default DragSource(itemType.WIDGET, spec, collect)(WidgetDragger);
