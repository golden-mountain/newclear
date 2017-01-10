import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import { ButtonGroup } from 'react-bootstrap';

export default widgetWrapper()(ButtonGroup, {
  meta: {
    widget: {
      iconClassName: 'fa fa-folder',
      type: 'layout',
      name: 'ButtonGroup',
      component: 'ButtonGroup',
      display: 'inline-block',
      isContainer: true,
      description: ''
    },
    defaultProps:  ButtonGroup.defaultProps,
    propTypes: ButtonGroup.propTypes,
    propGroups: {
      vertical: 'basic',
      justified: 'basic',
      block: 'basic',
      bsClass: 'advanced',
    }
  }
});
