import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import Radio from 'react-bootstrap/lib/Radio';

function MyRadio({ ...props }) {
  let checkboxProps = {};
  Object.keys(Radio.propTypes).forEach((key)=>{
    checkboxProps[key] = props[key];
  });
  return (
    <div className="editable-component-wrapper">
      {props.children}
      <Radio {...checkboxProps}/>
    </div>
  );
}


export default widgetWrapper()(MyRadio, {
  meta: {
    widget: {
      iconClassName: 'fa fa-dot-circle-o',
      type: 'Bootstrap',
      name: 'Radio',
      component: 'Radio',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({}, Radio.defaultProps),
    propTypes: Object.assign({}, Radio.propTypes),
    propGroups: {
      inline: 'basic',
      disabled: 'basic',
      validationState: 'advanced',
      inputRef: 'ignore',
      bsClass: 'basic'
    }
  }
});
