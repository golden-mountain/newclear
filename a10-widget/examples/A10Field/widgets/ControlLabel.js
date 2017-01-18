import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

function MyControlLabel({ ...props }) {
  let checkboxProps = {};
  Object.keys(ControlLabel.propTypes).forEach((key)=>{
    checkboxProps[key] = props[key];
  });
  return (
    <div className="editable-component-wrapper">
      {props.children}
      <ControlLabel {...checkboxProps}/>
    </div>
  );
}


export default widgetWrapper()(MyControlLabel, {
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
    defaultProps: Object.assign({}, ControlLabel.defaultProps, {
      schemaChildren: 'My ControlLabel'
    }),
    propTypes: Object.assign({}, ControlLabel.propTypes, {
      schemaChildren: React.PropTypes.string
    }),
    propGroups: {
      schemaChildren: 'basic',
      htmlFor: 'basic',
      srOnly: 'basic',
      bsClass: 'basic'
    }
  }
});
