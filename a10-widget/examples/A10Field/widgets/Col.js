import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import { Col } from 'react-bootstrap';

export default widgetWrapper()(Col, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Bootstrap Container',
      name: 'Col',
      component: 'Col',
      display: 'block',
      isContainer: true,
      description: ''
    },
    defaultProps: Object.assign({}, Col.defaultProps),
    propTypes: Object.assign({}, Col.propTypes),
    propGroups: {
      xs: 'basic',
      sm: 'basic',
      md: 'basic',
      lg: 'basic',
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
