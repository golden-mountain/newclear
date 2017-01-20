import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import ReactFormControl from 'react-bootstrap/lib/FormControl';

export default widgetWrapper()(ReactFormControl, {
  meta: {
    widget: {
      iconClassName: 'fa fa-wpforms',
      type: 'Bootstrap',
      name: 'FormControl',
      component: 'FormControl',
      display: 'block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({}, ReactFormControl.defaultProps, {
      type: 'text'
    }),
    propTypes: Object.assign({}, ReactFormControl.propTypes),
    propGroups: {
    }
  }
});
