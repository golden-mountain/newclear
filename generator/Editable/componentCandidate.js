import React, { Component, PropTypes } from 'react';
import { DragSource as dragSource } from 'react-dnd';
import DndTypes from './DndTypes';


import './componentCandidate.css';

export default function (componentCandidate) {

  const componentSource = {
    isDragging(props, monitor) {
      return monitor.getItem().id === props.id;
    },

    beginDrag(props/* , monitor, component */) {
      const componentModule = componentCandidate[props.component];
      const item = Object.assign({
        component: props.component,
        _isNew: true,
        _isContainer: props.isContainer
      }, componentModule.meta.defaultProps ? { ...componentModule.meta.defaultProps } : {});
      return item;
    }
  };

  @dragSource(DndTypes.COMPONENT, componentSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))

  class ComponentCandidate extends Component {
    static propTypes = {
      connectDragSource: PropTypes.func,
      iconClassName: PropTypes.string,
      name: PropTypes.string,
      component: PropTypes.string,
      isContainer: PropTypes.bool
    }

    render() {
      const {
        connectDragSource,
        iconClassName,
        name
      } = this.props;
      return connectDragSource(
        <div>
          <div>
            <i className={iconClassName} />
            &nbsp;{name}
          </div>
        </div>
      );
    }
  }

  return ComponentCandidate;

}


