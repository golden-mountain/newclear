import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import { ButtonToolbar } from 'react-bootstrap';

export default widgetWrapper()(ButtonToolbar, {
  meta: {
    widget: {
      iconClassName: 'fa fa-folder',
      type: 'layout',
      name: 'ButtonToolbar',
      component: 'ButtonToolbar',
      display: 'block',
      isContainer: true,
      description: ''
    },
    defaultProps:  ButtonToolbar.defaultProps,
    propTypes: ButtonToolbar.propTypes,
    propGroups: {
    }
  }
});
