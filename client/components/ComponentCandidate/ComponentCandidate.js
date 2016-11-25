import React, {Component, PropTypes} from 'react';
import { DragSource as dragSource} from 'react-dnd';
import DndTypes from '../../constants/DndTypes';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

import './ComponentCandidate.css';

const allComponents = require('components');
const componentSource = {
  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  },

  beginDrag(props/* , monitor, component */) {
    const componentModule = allComponents[props.component];
    const item = Object.assign({
      component: props.component,
      _isNew: true,
      _isContainer: props.isContainer
    }, componentModule.getComponentDefaultProps ? {...componentModule.getComponentDefaultProps()} : {});
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
        <ListGroupItem>
          <i className={iconClassName} />
          &nbsp;{name}
        </ListGroupItem>
      </div>
    );
  }
}

export default ComponentCandidate;
