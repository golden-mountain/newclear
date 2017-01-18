import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import Checkbox from 'react-bootstrap/lib/Checkbox';

function MyCheckbox({ ...props }) {
  let checkboxProps = {};
  Object.keys(Checkbox.propTypes).forEach((key)=>{
    checkboxProps[key] = props[key];
  });
  return (
    <div className="editable-component-wrapper">
      {props.children}
      <Checkbox {...checkboxProps}/>
    </div>
  );
}

export default widgetWrapper()(MyCheckbox, {
  meta: {
    widget: {
      iconClassName: 'fa fa-check-square-o',
      type: 'Bootstrap',
      name: 'Checkbox',
      component: 'Checkbox',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({}, Checkbox.defaultProps),
    propTypes: Object.assign({}, Checkbox.propTypes),
    propGroups: {
      inline: 'basic',
      disabled: 'basic',
      validationState: 'advanced',
      inputRef: 'ignore',
      bsClass: 'basic'
    }
  }
});
