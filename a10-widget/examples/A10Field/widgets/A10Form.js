import React, { PropTypes } from 'react';
import A10Form from '../../../src/widgets/A10Form';

// import slbVirtualServerSchema from '../../../../schemas/slb-virtual-server.json';
import { widgetWrapper } from 'widgetWrapper';

function MyA10Form({ ...props }) {
  let newProps = {};
  Object.keys(A10Form.propTypes).forEach((key)=>{
    newProps[key] = props[key];
  });
  return (
    <div style={ { position: 'relative' } }>
      {props.children}
      <A10Form {...newProps}>
        {props.children}
      </A10Form>
    </div>
  );
}

export default widgetWrapper()(MyA10Form, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Field',
      name: 'A10Form',
      component: 'A10Form',
      display: 'block',
      isContainer: true,
      description: ''
    },
    defaultProps: {
      schema: {},
      redirect: { path: 'list' }, 
      horizontal: true
    },
    propTypes: Object.assign({}, A10Form.propTypes, {
      schema: PropTypes.object.isRequired,
      redirect: PropTypes.object.isRequired,
      horizontal: PropTypes.bool
    }),
    propGroups: {
      schema: 'basic',
      redirect: 'basic',
      horizontal: 'basic',
      store: 'ignore'
    }
  }
});
