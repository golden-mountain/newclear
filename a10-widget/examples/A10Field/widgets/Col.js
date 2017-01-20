import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import Col from 'react-bootstrap/lib/Col';

export default widgetWrapper()(Col, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Bootstrap Container',
      name: 'Col',
      component: 'Col',
      display: 'block',
      isContainer: true,
      description: '',
      isWrapperItself: true
    },
    defaultProps: Object.assign({}, Col.defaultProps, {
      xs: 6,
      sm: 6,
      md: 6,
      lg: 6,
    }),
    propTypes: Object.assign({}, Col.propTypes),
    propGroups: {
      xs: 'basic',
      sm: 'basic',
      md: 'basic',
      lg: 'basic',
      componentClass: 'advanced',
      bsClass: 'advanced',
      xsHidden: 'basic',
      smHidden: 'basic',
      mdHidden: 'basic',
      lgHidden: 'basic',
      xsOffset: 'basic',
      smOffset: 'basic',
      mdOffset: 'basic',
      lgOffset: 'basic',
      xsPush: 'basic',
      smPush: 'basic',
      mdPush: 'basic',
      lgPush: 'basic',
      xsPull: 'basic',
      smPull: 'basic',
      mdPull: 'basic',
      lgPull: 'basic',
    }
  }
});
