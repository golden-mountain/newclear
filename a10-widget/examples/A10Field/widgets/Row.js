import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import Row from 'react-bootstrap/lib/Row';

export default widgetWrapper()(Row, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Bootstrap Container',
      name: 'Row',
      component: 'Row',
      display: 'block',
      isContainer: true,
      description: '',
      isWrapperItself: true
    },
    defaultProps: Object.assign({}, Row.defaultProps),
    propTypes: Object.assign({}, Row.propTypes),
    propGroups: {
      componentClass: 'basic',
      bsClass: 'basic'
    }
  }
});
