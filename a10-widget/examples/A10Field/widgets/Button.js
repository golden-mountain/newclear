import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import Button from 'react-bootstrap/lib/Button';

function MyButton({ ...props }) {
  let validProps = {};
  Object.keys(Button.propTypes).forEach((key)=>{
    validProps[key] = props[key];
  });
  return (
    <Button {...validProps} className="editable-component-wrapper">
      {props.children}
    </Button>
  );
}

export default widgetWrapper()(MyButton, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Bootstrap',
      name: 'Button',
      component: 'Button',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({}, Button.defaultProps, {
      schemaChildren: 'My Button'
    }),
    propTypes: Object.assign({}, Button.propTypes, {
      schemaChildren: React.PropTypes.string
    }),
    propGroups: {
      active: 'basic',
      disabled: 'advanced',
      block: 'basic',
      onClick: 'Event',
      type: 'basic',
      bsStyle: 'advanced',
      bsSize: 'advanced',
      bsClass: 'advanced',
      href: 'basic',
      componentClass: 'advanced',
      schemaChildren: 'basic'
    }
  }
});
