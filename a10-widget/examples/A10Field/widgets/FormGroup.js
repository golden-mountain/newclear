import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import FormGroup from 'react-bootstrap/lib/FormGroup';

function MyFormGroup({ ...props }) {
  let validProps = {};
  Object.keys(FormGroup.propTypes).forEach((key)=>{
    validProps[key] = props[key];
  });
  return (
    <FormGroup {...validProps} style={ { position: 'relative', margin: 0 } }>
      {props.children}
    </FormGroup>
  );
}


export default widgetWrapper()(MyFormGroup, {
  meta: {
    widget: {
      iconClassName: 'fa fa-wpforms',
      type: 'Bootstrap Container',
      name: 'FormGroup',
      component: 'FormGroup',
      display: 'block',
      isContainer: true,
      description: ''
    },
    defaultProps: Object.assign({}, FormGroup.defaultProps),
    propTypes: Object.assign({}, FormGroup.propTypes),
    propGroups: {
    }
  }
});
