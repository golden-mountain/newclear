import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import Row from 'react-bootstrap/lib/Row';

function MyRow({ ...props }) {
  let validProps = {};
  Object.keys(Row.propTypes).forEach((key)=>{
    validProps[key] = props[key];
  });
  return (
    <Row {...validProps} className="editable-component-wrapper">
      {props.children}
    </Row>
  );
}


export default widgetWrapper()(MyRow, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Bootstrap Container',
      name: 'Row',
      component: 'Row',
      display: 'block',
      isContainer: true,
      description: ''
    },
    defaultProps: Object.assign({}, Row.defaultProps),
    propTypes: Object.assign({}, Row.propTypes),
    propGroups: {
      componentClass: 'basic',
      bsClass: 'basic'
    }
  }
});
