import React from 'react';

import { widgetWrapper } from 'widgetWrapper';
import { A10TagInput } from '../../../src/widgets/A10Field/FieldWidgets';

export default widgetWrapper([ 'app' ])(A10TagInput, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'basic',
      name: 'A10TagInput',
      component: 'A10TagInput',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({
      values: [ 'Test1', 'Test2' ]
    }, A10TagInput.defaultProps),
    propTypes: Object.assign({
      children: React.PropTypes.string
    }, A10TagInput.propTypes),
    propGroups: {
      active: 'basic',
      disabled: 'advanced',
      block: 'basic',
      onClick: 'event',
      type: 'basic',
      bsStyle: 'advanced',
      bsSize: 'advanced',
      bsClass: 'advanced',
      children: 'basic'
    }
  }
});
