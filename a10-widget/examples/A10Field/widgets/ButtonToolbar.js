import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

export default widgetWrapper()(ButtonToolbar, {
  meta: {
    widget: {
      iconClassName: 'fa fa-folder',
      type: 'Bootstrap Container',
      name: 'ButtonToolbar',
      component: 'ButtonToolbar',
      display: 'block',
      isContainer: true,
      description: '',
      isWrapperItself: true
    },
    defaultProps:  ButtonToolbar.defaultProps,
    propTypes: ButtonToolbar.propTypes,
    propGroups: {
      bsSize: 'basic',
      bsClass: 'basic'
    }
  }
});
