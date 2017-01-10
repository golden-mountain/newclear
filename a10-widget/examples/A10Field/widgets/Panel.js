import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import { Panel } from 'react-bootstrap';

export default widgetWrapper()(Panel, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'layout',
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
