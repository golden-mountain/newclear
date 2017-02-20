import React, { Component, PropTypes } from 'react';
import { DragSource as dragSource } from 'react-dnd';
import DndTypes from './DndTypes';
import _ from 'lodash';

import './componentCandidate.css';

export default function (componentCandidate) {

  const componentSource = {
    isDragging(props, monitor) {
      return monitor.getItem()._componentId === props._componentId;
    },

    beginDrag(props/* , monitor, component */) {
      const { meta } = componentCandidate[props.component];
      const item = Object.assign({
        component: props.component,
        _componentId: _.uniqueId(),
        _isContainer: meta.widget.isContainer
      }, meta.defaultProps ? { ...meta.defaultProps } : {}, 
        props.meta && props.meta.defaultProps ? { ...props.meta.defaultProps } : {}
      );
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
      addComponentByClicking: PropTypes.func,
      component: PropTypes.string,
      style: PropTypes.object
    }

    onClick = () => {
      this.props.addComponentByClicking(componentSource.beginDrag(this.props));
    }

    render() {
      const componentModule = componentCandidate[this.props.component];
      const {
        connectDragSource,
        style
      } = this.props;

      const {
        meta: {
          widget: {
            name,
            iconClassName
          }
        }
      } = componentModule;

      return connectDragSource(
        <div 
          title={name }
          style={style} 
          onClick={this.onClick}>
          <i className={iconClassName} />
          <br/>
          <span>{name}</span>
        </div>
      );
    }
  }
  return ComponentCandidate;
}


