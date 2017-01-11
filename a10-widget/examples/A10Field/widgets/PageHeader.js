import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import { PageHeader } from 'react-bootstrap';

export default widgetWrapper()(PageHeader, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
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
      // active: 'basic',
      // disabled: 'advanced',
      // block: 'basic',
      // onClick: 'event',
      // type: 'basic',
      // bsStyle: 'advanced',
      // bsSize: 'advanced',
      // bsClass: 'advanced',
      // schemaChildren: 'basic'
    }
  }
});
