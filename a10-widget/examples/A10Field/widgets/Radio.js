import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import Radio from 'react-bootstrap/lib/Radio';

export default widgetWrapper()(Radio, {
  meta: {
    widget: {
      iconClassName: 'fa fa-dot-circle-o',
      type: 'Bootstrap',
      name: 'Radio',
      component: 'Radio',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({}, Radio.defaultProps),
    propTypes: Object.assign({}, Radio.propTypes),
    propGroups: {
      inline: 'basic',
      disabled: 'basic',
      validationState: 'advanced',
      inputRef: 'ignore',
      bsClass: 'basic'
    }
  }
});
