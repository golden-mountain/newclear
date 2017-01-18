import React from 'react';

import { widgetWrapper } from 'widgetWrapper';
import { A10MultiSelect } from '../../../src/widgets/A10Field/FieldWidgets';

function MyA10MultiSelect({ ...props }) {
  let validProps = {};
  Object.keys(A10MultiSelect.propTypes).forEach((key)=>{
    validProps[key] = props[key];
  });
  return (
    <div className="editable-component-wrapper">
      {props.children}
      <A10MultiSelect {...validProps}/>
    </div>
  );
}


export default widgetWrapper([ 'app' ])(MyA10MultiSelect, {
  meta: {
    widget: {
      iconClassName: 'fa fa-tags',
      type: 'Field',
      name: 'A10MultiSelect',
      component: 'A10MultiSelect',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({}, A10MultiSelect.defaultProps, {
      options: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        { label: '10', value: 10 },
        { label: '11', value: 11, disabled: true }
      ]
    }),
    propTypes: A10MultiSelect.propTypes,
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
