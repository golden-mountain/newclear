import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import Panel from 'react-bootstrap/lib/Panel';

function MyPanel({ ...props }) {
  let validProps = {};
  Object.keys(Panel.propTypes).forEach((key)=>{
    validProps[key] = props[key];
  });
  return (
    <Panel {...validProps} className="editable-component-wrapper">
      {props.children}
    </Panel>
  );
}


export default widgetWrapper()(MyPanel, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Bootstrap Container',
      name: 'Panel',
      component: 'Panel',
      display: 'block',
      isContainer: true,
      description: ''
    },
    defaultProps: Object.assign({}, Panel.defaultProps),
    propTypes: Object.assign({}, Panel.propTypes),
    propGroups: {
      onSelect: 'event',
      onEnter: 'event',
      onEntering: 'event',
      onEntered: 'event',
      onExit: 'event',
      onExiting: 'event',
      onExited: 'event',
      bsStyle: 'basic',
      header: 'basic',
      footer: 'basic',
      defaultExpanded: 'basic',
      expanded: 'basic',
      eventKey: 'advanced',
      headerRole: 'advanced',
      panelRole: 'advanced',
      collapsible: 'basic',
      id: 'advanced',
      bsClass: 'advanced'
    }
  }
});
