import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import Form from 'react-bootstrap/lib/Form';

export default widgetWrapper()(Form, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Bootstrap Container',
      name: 'Form',
      component: 'Form',
      display: 'block',
      isContainer: true,
      description: ''
    },
    defaultProps: Object.assign({}, Form.defaultProps, {
      horizontal: true
    }),
    propTypes: Object.assign({}, Form.propTypes),
    propGroups: {
      horizontal: 'basic',
      inline: 'basic',
      componentClass: 'basic',
      bsClass: 'basic'
    }
  }
});
