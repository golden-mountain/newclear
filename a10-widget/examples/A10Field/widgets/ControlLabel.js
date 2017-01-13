import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import { ControlLabel } from 'react-bootstrap';

export default widgetWrapper()(ControlLabel, {
  meta: {
    widget: {
      iconClassName: 'fa fa-font',
      type: 'Bootstrap',
      name: 'ControlLabel',
      component: 'ControlLabel',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({
      schemaChildren: 'My ControlLabel'
    }, ControlLabel.defaultProps),
    propTypes: Object.assign({
      schemaChildren: React.PropTypes.string
    }, ControlLabel.propTypes),
    propGroups: {
    }
  }
});
