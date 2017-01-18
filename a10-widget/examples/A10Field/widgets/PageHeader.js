import React from 'react';
import { widgetWrapper } from 'widgetWrapper';
import PageHeader from 'react-bootstrap/lib/PageHeader';

function MyPageHeader({ ...props }) {
  let myProps = {};
  Object.keys(PageHeader.propTypes).forEach((key)=>{
    myProps[key] = props[key];
  });
  return (
    <PageHeader {...myProps} className="editable-component-wrapper">
      {props.children}
    </PageHeader>
  );
}

export default widgetWrapper()(MyPageHeader, {
  meta: {
    widget: {
      iconClassName: 'fa fa-header',
      type: 'Bootstrap',
      name: 'PageHeader',
      component: 'PageHeader',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({}, PageHeader.defaultProps, {
      schemaChildren: 'My PageHeader'
    }),
    propTypes: Object.assign({}, PageHeader.propTypes, {
      schemaChildren: React.PropTypes.string
    }),
    propGroups: {
      schemaChildren: 'basic',
      bsClass: 'basic'
    }
  }
});
