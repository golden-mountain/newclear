import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import ReactFormControl from 'react-bootstrap/lib/FormControl';

function FormControl({ ...props }) {
  var newProps = Object.assign({}, props);
  delete newProps.children;
  return (
    <div style={{ position: 'relative' }}>
      { props.children }
      <ReactFormControl {...newProps}/>
    </div>
  );
}

export default widgetWrapper()(FormControl, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Bootstrap',
      name: 'FormControl',
      component: 'FormControl',
      display: 'block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({
      type: 'text'
    }, ReactFormControl.defaultProps),
    propTypes: Object.assign({}, ReactFormControl.propTypes),
    propGroups: {
    }
  }
});
