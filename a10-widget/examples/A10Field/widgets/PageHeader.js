import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import PageHeader from 'react-bootstrap/lib/PageHeader';

export default widgetWrapper()(PageHeader, {
  meta: {
    widget: {
      iconClassName: 'fa fa-header',
      type: 'Bootstrap',
      name: 'PageHeader',
      component: 'PageHeader',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({}, PageHeader.defaultProps, {
      schemaChildren: 'My PageHeader'
    }),
    propTypes: Object.assign({}, PageHeader.propTypes, {
      schemaChildren: React.PropTypes.string
    }),
    propGroups: {
      schemaChildren: 'basic',
      bsClass: 'basic'
    }
  }
});
