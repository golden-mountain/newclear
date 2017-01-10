import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import { Row } from 'react-bootstrap';

export default widgetWrapper()(Row, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'layout',
      name: 'Row',
      component: 'Row',
      display: 'block',
      isContainer: true,
      description: ''
    },
    defaultProps: Object.assign({}, Row.defaultProps),
    propTypes: Object.assign({}, Row.propTypes),
    propGroups: {}
  }
});
