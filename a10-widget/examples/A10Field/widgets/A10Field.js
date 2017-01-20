import React, { PropTypes } from 'react';
import A10Field from '../../../src/widgets/A10Field';

import { widgetWrapper } from 'widgetWrapper';

export default widgetWrapper()(A10Field, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Field',
      name: 'A10Field',
      component: 'A10Field',
      display: 'inline-block',
      isContainer: false,
      description: '',
      schema: {},
      redirect: {}
    },
    defaultProps: {
      name: 'A10Field',
      label: 'A10Field',
      schema: {},
      redirect: {}
    },
    propTypes: Object.assign({}, A10Field.propTypes, {
      name: PropTypes.object.isRequired,
      label: PropTypes.object.isRequired,
      value: PropTypes.bool,
      conditional: PropTypes.object,
      layout: PropTypes.element
    }),
    propGroups: {
      name: 'basic',
      label: 'basic',
      value: 'basic',
      conditional: 'basic',
      layout: 'basic'
    }
  }
});
