import React, { PropTypes } from 'react';
import A10Field from '../../../src/widgets/A10Field';

import { widgetWrapper } from 'widgetWrapper';

function MyA10Field({ ...props }) {
  var newProps = Object.assign({}, props, { children: null });
  return (
    <div className="editable-component-wrapper">
      {props.children}
      <A10Field {...newProps} />
    </div>
  );
}

export default widgetWrapper()(MyA10Field, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Field',
      name: 'A10Field',
      component: 'A10Field',
      display: 'inline-block',
      isContainer: false,
      description: '',
      schema: {},
      redirect: {}
    },
    defaultProps: {
      name: 'A10Field',
      label: 'A10Field'
    },
    propTypes: Object.assign({}, A10Field.propTypes, {
      schema: PropTypes.object.isRequired,
      redirect: PropTypes.object.isRequired,
      horizontal: PropTypes.bool,
      description: PropTypes.string,
      widgetProps: PropTypes.object
    }),
    propGroups: {
      schema: 'basic',
      redirect: 'basic',
      horizontal: 'basic',
      description: 'basic',
      widgetProps: 'basic',
      store: 'ignore'
    }
  }
});
