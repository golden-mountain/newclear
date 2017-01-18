import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

function MyButtonToolbar({ ...props }) {
  let validProps = {};
  Object.keys(ButtonToolbar.propTypes).forEach((key)=>{
    validProps[key] = props[key];
  });
  return (
    <ButtonToolbar {...validProps} className="editable-component-wrapper">
      {props.children}
    </ButtonToolbar>
  );
}

export default widgetWrapper()(MyButtonToolbar, {
  meta: {
    widget: {
      iconClassName: 'fa fa-folder',
      type: 'Bootstrap Container',
      name: 'ButtonToolbar',
      component: 'ButtonToolbar',
      display: 'block',
      isContainer: true,
      description: ''
    },
    defaultProps:  ButtonToolbar.defaultProps,
    propTypes: ButtonToolbar.propTypes,
    propGroups: {
      bsSize: 'basic',
      bsClass: 'basic'
    }
  }
});
