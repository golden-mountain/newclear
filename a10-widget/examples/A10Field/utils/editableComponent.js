import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import {
  DragSource as dragSource,
  DropTarget as dropTarget
} from 'react-dnd';
import DndTypes from './DndTypes';
import './editableComponent.scss';


export default function editableComponent({
  startToEditComponent = ()=> {},
  deleteComponent = ()=> {},
  moveComponent = ()=> {}
}) {
  const componentSource = {
    isDragging(props, monitor) {
      return monitor.getItem().id === props.id;
    },
    beginDrag(props/* , monitor, component */) {
      const item = props;
      return item;
    }
  };
  const componentTarget = {
    drop(props, monitor, component ) {
      const item = monitor.getItem();
      if (monitor.didDrop()) {
        return;
      }
      if (props._componentId === item._componentId) {
        return;
      }
      const dropBoundingRect = findDOMNode(component).getBoundingClientRect();
      const dropMiddleY = (dropBoundingRect.bottom - dropBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const dropClientY = clientOffset.y - dropBoundingRect.top;
      let newPosition = 'before';
      if (props._isRoot) {
        newPosition = 'inside';
      } else if (props._isContainer) {
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

      moveComponent(Object.assign({}, item, { _isNew: false }), props._componentId, item._isNew, newPosition);
    }
  };

  return (WrappedComponent, meta) => {
    /* eslint-disable */
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
        _componentId: PropTypes.string,
        _isRoot: PropTypes.bool,
        editingComponentId: PropTypes.string,
        connectDragSource: PropTypes.func,
        connectDropTarget: PropTypes.func,
        children: PropTypes.node
      };

      deleteComponent = (event) => {
        event.stopPropagation();
        deleteComponent(this.props._componentId);
      }

      editProperties = (event) => {
        event.stopPropagation();
        startToEditComponent({
          componentMeta: meta,
          componentProps: this.props
        });
      }

      getRefOfWrappedComponent = (instance) => {
        const {
          connectDragSource,
          connectDropTarget
        } = this.props;
        const domNode = findDOMNode(instance);
        connectDragSource(domNode);
        connectDropTarget(domNode);
        return domNode;
      }

      renderToolbar = () => {
        const { _isRoot } = this.props;
        return !_isRoot && (
          <div className="editable-component-toolbar">
            <i className="fa fa-cog" onClick={this.editProperties}/>
            <i className="fa fa-trash" onClick={this.deleteComponent}/>
          </div>
        );
      }

      renderChildren = () => {
        const {
          _isRoot,
          _isContainer,
          children
        } = this.props;
        return _isContainer || _isRoot ? (
          <div style={{ padding: 8 }}> { children }  </div>
        ) : ( children );
      }

      render() {
        const {
          _componentId,
          _isContainer,
          _isRoot,
          editingComponentId
        } = this.props;
        const isActive = _componentId === editingComponentId;
        let componentClassName = '';
        componentClassName += isActive ? 'editable-component-active ' : 'editable-component-normal ';
        componentClassName += _isContainer || _isRoot ? 'editable-component-container ' : '';
        componentClassName += _isRoot ? 'editable-component-root ' : '';
        const propsWithouChildren = Object.assign({}, this.props, { children: null });
        if (meta.widget.isWrapperItself) {
          return (
            <WrappedComponent 
              {...propsWithouChildren} 
              ref={this.getRefOfWrappedComponent} 
              className="editable-component-wrapper"
            > 
              <div 
                onClick={this.editProperties}
                className={componentClassName}
              >
                { this.renderToolbar() }
              </div>
              { this.renderChildren() }
              <div className={ _isContainer || _isRoot ? 'editable-component-container-spacing' : ''} />
            </WrappedComponent>
          );
        } else {
          return (
            <div className="editable-component-wrapper" ref={this.getRefOfWrappedComponent}>
              <WrappedComponent {...propsWithouChildren}  />
              <div 
                onClick={this.editProperties}
                className={componentClassName}
              >
                { this.renderToolbar() }
              </div>
              { this.renderChildren() }
              <div className={ _isContainer || _isRoot ? 'editable-component-container-spacing' : ''} />
            </div>
          );
        }

      }
    }
    return Wrap;
  };
}
