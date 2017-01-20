import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import FormGroup from 'react-bootstrap/lib/FormGroup';

export default widgetWrapper()(FormGroup, {
  meta: {
    widget: {
      iconClassName: 'fa fa-wpforms',
      type: 'Bootstrap Container',
      name: 'FormGroup',
      component: 'FormGroup',
      display: 'block',
      isContainer: true,
      description: '',
      isWrapperItself: true
    },
    defaultProps: Object.assign({}, FormGroup.defaultProps),
    propTypes: Object.assign({}, FormGroup.propTypes),
    propGroups: {
    }
  }
});
