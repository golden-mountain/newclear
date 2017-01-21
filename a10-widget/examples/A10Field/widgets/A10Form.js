import React, { PropTypes } from 'react';
import A10Form from '../../../src/widgets/A10Form';

import { widgetWrapper } from 'widgetWrapper';

export default widgetWrapper()(A10Form, {
  meta: {
    widget: {
      iconClassName: 'fa fa-wpforms',
      type: 'Field',
      name: 'A10Form',
      component: 'A10Form',
      display: 'block',
      isContainer: true,
      description: ''
    },
    defaultProps: {
      schema: 'slb-virtual-server',
      redirect: { path: 'list' }, 
      horizontal: true
    },
    propTypes: Object.assign({}, A10Form.propTypes, {
      schema: PropTypes.string.isRequired,
      redirect: PropTypes.object.isRequired,
      horizontal: PropTypes.bool
    }),
    propGroups: {
      schema: 'basic',
      redirect: 'basic',
      horizontal: 'basic',
      store: 'ignore'
    }
  }
});
