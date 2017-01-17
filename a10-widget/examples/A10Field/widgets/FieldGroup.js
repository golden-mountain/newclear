import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import FieldGroup from './source/FieldGroup';


function MyFieldGroup({ ...props }) {
  return (
    <div style={ { position: 'relative' } }>
      {props.children}
      <FieldGroup {...props}/>
    </div>
  );
}

export default widgetWrapper()(MyFieldGroup, {
  meta: {
    widget: {
      iconClassName: 'fa fa-square-o',
      type: 'Field',
      name: 'FieldGroup',
      component: 'FieldGroup',
      description: ''
    },
    defaultProps: {
      label: 'label',
      required: false,
      type: 'text',
      pattern: null,
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
