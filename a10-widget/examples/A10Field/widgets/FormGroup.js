import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import FormGroup from 'react-bootstrap/lib/FormGroup';

export default widgetWrapper()(FormGroup, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Bootstrap',
      name: 'FormGroup',
      component: 'FormGroup',
      display: 'block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({
    }, FormGroup.defaultProps),
    propTypes: Object.assign({
    }, FormGroup.propTypes),
    propGroups: {
    }
  }
});
