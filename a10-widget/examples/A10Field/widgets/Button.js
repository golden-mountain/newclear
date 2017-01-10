import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import { Button } from 'react-bootstrap';


export default widgetWrapper()(Button, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'basic',
      name: 'Button',
      component: 'Button',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({
      children: 'My Button'
    }, Button.defaultProps),
    propTypes: Object.assign({
      children: React.PropTypes.string
    }, Button.propTypes),
    propGroups: {
      active: 'basic',
      disabled: 'advanced',
      block: 'basic',
      onClick: 'event',
      type: 'basic',
      bsStyle: 'advanced',
      bsSize: 'advanced',
      bsClass: 'advanced',
      children: 'basic'
    }
  }
});
