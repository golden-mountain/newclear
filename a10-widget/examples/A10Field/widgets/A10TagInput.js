import React from 'react';

import { widgetWrapper } from 'widgetWrapper';
import { A10TagInput } from '../../../src/widgets/A10Field/FieldWidgets';

function MyA10TagInput({ ...props }) {
  let validProps = {};
  Object.keys(A10TagInput.propTypes).forEach((key)=>{
    validProps[key] = props[key];
  });
  return (
    <div className="editable-component-wrapper">
      {props.children}
      <A10TagInput {...validProps}/>
    </div>
  );
}


export default widgetWrapper([ 'app' ])(MyA10TagInput, {
  meta: {
    widget: {
      iconClassName: 'fa fa-tag',
      type: 'Field',
      name: 'A10TagInput',
      component: 'A10TagInput',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({}, A10TagInput.defaultProps, {
      values: [ 'Test1', 'Test2' ]
    }),
    propTypes: Object.assign({}, A10TagInput.propTypes, {
      children: React.PropTypes.string
    }),
    propGroups: {
      active: 'basic',
      disabled: 'advanced',
      block: 'basic',
      onClick: 'event',
      type: 'basic',
      bsStyle: 'advanced',
      bsSize: 'advanced',
      bsClass: 'advanced',
      children: 'basic'
    }
  }
});
