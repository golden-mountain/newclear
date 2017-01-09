import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  let formControlProps = {};
  Object.keys(FormControl.propTypes).forEach((key)=>{
    formControlProps[key] = props[key];
  });
  return (
    <div style={ { position: 'relative' } }>
      {props.children}
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...formControlProps} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    </div>
  );
}

export default widgetWrapper()(FieldGroup, {
  meta: {
    widget: {
      iconClassName: 'fa fa-square-o',
      type: 'basic',
      name: 'FieldGroup',
      component: 'FieldGroup',
      description: ''
    },
    defaultProps: Object.assign({
      label: 'Label',
      help: 'Help'
    }, FormControl.defaultProps),
    propTypes: Object.assign({
      label: React.PropTypes.string,
      help: React.PropTypes.string
    }, FormControl.propTypes),
    propGroups: {
      label: 'basic',
      help: 'basic',
      type: 'basic',
      bsClass: 'advanced'
    }
  }
});
