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
    defaultProps: Object.assign({
      schemaChildren: 'My PageHeader'
    }, PageHeader.defaultProps),
    propTypes: Object.assign({
      schemaChildren: React.PropTypes.string
    }, PageHeader.propTypes),
    propGroups: {
      schemaChildren: 'basic',
      bsClass: 'basic'
    }
  }
});
