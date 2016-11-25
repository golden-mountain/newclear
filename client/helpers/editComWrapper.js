import React, {Component, PropTypes} from 'react';
import { findDOMNode } from 'react-dom';
import {connect} from 'react-redux';
import {
  DragSource as dragSource,
  DropTarget as dropTarget
} from 'react-dnd';
import DndTypes from '../constants/DndTypes';
import {
  startToEditComponent,
  addComponent,
  deleteComponent,
  moveComponent
} from '../redux/modules/componentBuilder';

const componentSource = {
  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  },
  beginDrag(props/* , monitor, component */) {
    const item = props;
    return item;
  },
};
const componentTarget = {
  drop(props, monitor, component ) {
    const item = monitor.getItem();
    if (monitor.didDrop()) {
      return;
    }
    if (props.componentId === item.componentId) {
      return;
    }
    const dropBoundingRect = findDOMNode(component).getBoundingClientRect();
    const dropMiddleY = (dropBoundingRect.bottom - dropBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const dropClientY = clientOffset.y - dropBoundingRect.top;
    let newPosition = 'before';

    if (props._isContainer) {
      if (dropClientY >= dropMiddleY * 0.5 && dropClientY <= dropMiddleY * 1.5) {
        newPosition = 'inside';
      } else if (dropClientY > dropMiddleY * 1.5) {
        newPosition = 'after';
      }
    } else {
      if (dropClientY > dropMiddleY) {
        newPosition = 'after';
      }
    }

    props.moveComponent(Object.assign({}, item, { _isNew: false, children: null }), props.componentId, item._isNew, newPosition);
  }
};

export default function connectToWrap() {
  return (WrappedComponent) => {
    /* eslint-disable */
    @connect(null, {
      startToEditComponent,
      deleteComponent,
      moveComponent,
      addComponent
    })
    @dragSource(DndTypes.COMPONENT, componentSource, (dragConnect, monitor) => ({
      connectDragSource: dragConnect.dragSource(),
      isDragging: monitor.isDragging(),
    }))
    @dropTarget(DndTypes.COMPONENT, componentTarget, (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),

    }))
    /* eslint-enable */
    class Wrap extends Component {
      static propTypes = {
        _isContainer: PropTypes.bool,
        componentId: PropTypes.string,
        editingComponentId: PropTypes.string,
        connectDragSource: PropTypes.func,
        connectDropTarget: PropTypes.func,
        startToEditComponent: PropTypes.func,
        deleteComponent: PropTypes.func,
        moveComponent: PropTypes.func,
        children: PropTypes.node,
      };

      deleteComponent(event) {
        event.stopPropagation();
        this.props.deleteComponent(this.props.componentId);
      }

      editProperties(event) {
        event.stopPropagation();
        this.props.startToEditComponent({
          componentPropTypes: WrappedComponent.propTypes,
          componentProps: this.props
        });
      }

      renderTitle() {
        return (
          <div >
            componentId: {this.props.componentId}
            <div className="pull-right">
              <i className="fa fa-cog" style={{cursor: 'pointer'}} onClick={::this.editProperties}/>
              &nbsp;&nbsp;&nbsp;
              <i className="fa fa-trash text-alert" style={{cursor: 'pointer'}} onClick={::this.deleteComponent}/>
            </div>
          </div>
        );
      }
      render() {
        const styles = require('./wrapper.scss');
        const {
          connectDragSource,
          connectDropTarget,
          componentId,
          editingComponentId,
          _isContainer
        } = this.props;


        // const ComponentId = 'componentId: ' + componentId;
        const isActive = componentId === editingComponentId;
        return (
          <WrappedComponent {...this.props}
            style={{position: 'relative'}}
            ref={instance => {
              const domNode = findDOMNode(instance);
              connectDragSource(domNode);
              connectDropTarget(domNode);
              return domNode;
            }
          }>
            <div onClick={::this.editProperties} className={ styles[isActive ? 'wrapper-active' : 'wrapper-normal']} style={{zIndex: -1}}/>
            <div style={Object.assign(_isContainer ? {minHeight: 50, minWidth: 100, overflow: 'hidden', padding: 10} : {} )}>
              {this.props.children}
            </div>
            <div style={{position: 'absolute', top: -10, right: -10}}>
              { /* <span>{ ComponentId }</span> */ }
              <i className="fa fa-cog {styles.edit}" onClick={::this.editProperties}/>
              <i className="fa fa-trash text-alert {styles.delete}" onClick={::this.deleteComponent}/>
            </div>
          </WrappedComponent>
        );
      }
    }
    return Wrap;
  };
}
