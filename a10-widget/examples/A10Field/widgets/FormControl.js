import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import ReactFormControl from 'react-bootstrap/lib/FormControl';

function FormControl({ ...props }) {
  var newProps = Object.assign({}, props);
  delete newProps.children;
  return (
    <div className="editable-component-wrapper">
      { props.children }
      <ReactFormControl {...newProps}/>
    </div>
  );
}

export default widgetWrapper()(FormControl, {
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
