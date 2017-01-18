import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

function MyButtonGroup({ ...props }) {
  let validProps = {};
  Object.keys(ButtonGroup.propTypes).forEach((key)=>{
    validProps[key] = props[key];
  });
  return (
    <ButtonGroup {...validProps} className="editable-component-wrapper">
      {props.children}
    </ButtonGroup>
  );
}

export default widgetWrapper()(MyButtonGroup, {
  meta: {
    widget: {
      iconClassName: 'fa fa-folder',
      type: 'Bootstrap Container',
      name: 'ButtonGroup',
      component: 'ButtonGroup',
      display: 'inline-block',
      isContainer: true,
      description: ''
    },
    defaultProps:  ButtonGroup.defaultProps,
    propTypes: ButtonGroup.propTypes,
    propGroups: {
      vertical: 'basic',
      justified: 'basic',
      block: 'basic',
      bsClass: 'advanced'
    }
  }
});
