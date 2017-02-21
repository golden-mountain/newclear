import React from 'react';

import { widgetWrapper } from 'widgetWrapper';
import { A10SubmitButtons } from '../../../../client/components/Form/A10SubmitButtons';

function MyA10SubmitButtons({ ...props }) {
  let newProps = {};
  return (
    <div className="editable-component-wrapper">
      {props.children}
      <A10SubmitButtons {...newProps} />
    </div>
  );
}

export default widgetWrapper()(MyA10SubmitButtons, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Field',
      name: 'A10SubmitButtons',
      component: 'A10SubmitButtons',
      display: 'block',
      isContainer: false,
      description: ''
    },
    defaultProps: {},
    propTypes: Object.assign({}, A10SubmitButtons.propTypes, {}),
    propGroups: {
      store: 'ignore'
    }
  }
});
