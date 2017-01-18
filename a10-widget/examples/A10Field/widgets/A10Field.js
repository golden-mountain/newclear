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
      description: ''
    },
    defaultProps: {
      name: 'A10Field',
      label: 'A10Field'
    },
    propTypes: Object.assign({}, A10Field.propTypes, {
      schema: PropTypes.object.isRequired,
      redirect: PropTypes.object.isRequired,
      horizontal: PropTypes.bool,
      description: PropTypes.string,
      widgetProps: PropTypes.object
    }),
    propGroups: {
      name: 'basic',
      label: 'basic',
      value: 'basic',
      conditional: 'basic',
      store: 'ignore'
    }
  }
});
