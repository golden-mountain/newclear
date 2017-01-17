import React from 'react';

import { widgetWrapper } from 'widgetWrapper';
import { A10TagInput } from '../../../src/widgets/A10Field/FieldWidgets';

function MyA10TagInput({ ...props }) {
  let a10TagInputProps = {};
  Object.keys(A10TagInput.propTypes).forEach((key)=>{
    a10TagInputProps[key] = props[key];
  });
  return (
    <div style={ { position: 'relative' } }>
      {props.children}
      <A10TagInput {...a10TagInputProps}/>
    </div>
  );
}


export default widgetWrapper([ 'app' ])(MyA10TagInput, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
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