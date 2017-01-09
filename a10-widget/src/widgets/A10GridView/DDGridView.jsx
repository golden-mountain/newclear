import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { widgetWrapper } from '../../widgetWrapper';
import GridView from './GridView';
import WidgetDropper from './WidgetDropper';
import WidgetDragger from './WidgetDragger';

import './assets/ddgridview.scss';

class DDGridView extends Component {

  static displayName = 'Dashboard'

  static propTypes = {
    children: PropTypes.array.isRequired,
    changeWidgetOrder: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  renderItem = (data) => {
    const { changeWidgetOrder } = this.props;
    // FIXME, should I change the key in WidgetDropper?
    return data.map((item, index) => (        
      <WidgetDropper key={index} boxIndex={index} width={item.props.width} >
        <WidgetDragger key={index} widgetIndex={index} changeWidgetOrder={changeWidgetOrder}>
          {item}
        </WidgetDragger>
      </WidgetDropper>
    ));
  }

  render() {
    const { children } = this.props;
    return <GridView className="ddgridview">{this.renderItem(children)}</GridView>;
  }

}

export default DragDropContext(HTML5Backend)(widgetWrapper([ 'app' ])(DDGridView));
