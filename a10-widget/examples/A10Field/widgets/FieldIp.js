import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import FieldGroup from './source/FieldGroup';

export default widgetWrapper()(FieldGroup, {
  meta: {
    widget: {
      iconClassName: 'fa fa-globe',
      type: 'Field',
      name: 'FieldIp',
      component: 'FieldIp',
      description: ''
    },
    defaultProps: {
      label: 'IP v4 Address',
      required: false,
      type: 'text',
      pattern: '((^|\\.)((25[0-5])|(2[0-4]\\d)|(1\\d\\d)|([1-9]?\\d))){4}$',
      typeMismatchErrorMessage: 'Validation failed!',
      requiredErrorMessage: 'This field is required'
    },
    propTypes: FieldGroup.propTypes,
    propGroups: {
      label: 'basic',
      required: 'basic',
      type: 'basic',
      pattern: 'advanced',
      typeMismatchErrorMessage: 'basic',
      requiredErrorMessage: 'basic'
    }
  }
});
