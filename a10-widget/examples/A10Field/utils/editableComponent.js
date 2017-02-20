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
      return monitor.getItem()._componentId === props._componentId;
    },
    beginDrag(props/* , monitor, component */) {
      const item = props;
      return item;
    }
  };

  const handleHoverAndDrop = ({ props, monitor, component, item, clientOffset }) => {
    const dropBoundingRect = findDOMNode(component).getBoundingClientRect();
    const dropMiddleX = (dropBoundingRect.right - dropBoundingRect.left) / 2;
    const dropClientX = clientOffset.x - dropBoundingRect.left;

    const dropMiddleY = (dropBoundingRect.bottom - dropBoundingRect.top) / 2;
    const dropClientY = clientOffset.y - dropBoundingRect.top;
    let newPosition = 'before';
    if (props._isRoot) {
      newPosition = 'inside';
    } else if (props._isContainer) {
      if ((dropClientY >= dropMiddleY * 0.5 && dropClientY <= dropMiddleY * 1.5) ||
        (dropClientX >= dropMiddleX * 0.5 && dropClientX <= dropMiddleX * 1.5)
      ) {
        newPosition = 'inside';
      } else if (dropClientY > dropMiddleY * 1.5 || dropClientX > dropMiddleX * 1.5) {
        newPosition = 'after';
      }
    } else {
      if (dropClientY > dropMiddleY || dropClientX > dropMiddleX) {
        newPosition = 'after';
      }
    }
    moveComponent(Object.assign({}, item, { children: null }), props._componentId, newPosition);
  };

  const componentTarget = {
    hover(props, monitor, component) {
      const item = monitor.getItem();
      if (!monitor.isOver({ shallow: true }) ) {
        return;
      }
      if (props._componentId === item._componentId) {
        return;
      }
      handleHoverAndDrop({
        props, 
        monitor, 
        component,
        item,
        clientOffset: monitor.getClientOffset()
      });
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
        _path: PropTypes.array,
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
          componentProps: this.props,
          path: this.props._path
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
          isDragging,
          _componentId,
          _isContainer,
          _isRoot,
          editingComponentId
        } = this.props;
        const isActive = _componentId === editingComponentId;
        let componentClassName = '';
        componentClassName += ( isActive || isDragging ) ? 'editable-component-active ' : 'editable-component-normal ';
        componentClassName += _isContainer || _isRoot ? 'editable-component-container ' : '';
        componentClassName += _isRoot ? 'editable-component-root ' : '';
        const propsWithouChildren = Object.assign({}, this.props, { children: null });
        if (meta.widget.isWrapperItself) {
          return (
            <WrappedComponent 
              {...propsWithouChildren} 
              style={isDragging? { opacity: .7 } : { opacity: 1 }}
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
            <div className="editable-component-wrapper" ref={this.getRefOfWrappedComponent} style={isDragging? { opacity: .7 } : { opacity: 1 }}>
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
