import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import Checkbox from 'react-bootstrap/lib/Checkbox';

export default widgetWrapper()(Checkbox, {
  meta: {
    widget: {
      iconClassName: 'fa fa-check-square-o',
      type: 'Bootstrap',
      name: 'Checkbox',
      component: 'Checkbox',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({}, Checkbox.defaultProps),
    propTypes: Object.assign({}, Checkbox.propTypes),
    propGroups: {
      inline: 'basic',
      disabled: 'basic',
      validationState: 'advanced',
      inputRef: 'ignore',
      bsClass: 'basic'
    }
  }
});
