import React, { Component, PropTypes } from 'react';
import A10Field from '../../../src/widgets/A10Field';
import { Col, Row, Panel, Radio, Checkbox, FormControl } from 'react-bootstrap';

import { widgetWrapper } from 'widgetWrapper';


function MyA10Textarea({ ...props }) {
  const fieldProps = { ...props };
  return (
    <A10Field {...fieldProps}>
      <textarea />
    </A10Field>
  );
}

export const A10Textarea = widgetWrapper(['app'])(MyA10Textarea, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Field',
      name: 'A10Textarea',
      component: 'A10Textarea',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: {
      name: 'A10Textarea',
      label: 'A10Textarea',
      type: 'input'
    },
    propTypes: Object.assign({}, A10Field.propTypes, {
      name: PropTypes.object.isRequired,
      label: PropTypes.object.isRequired,
      conditional: PropTypes.object,
      layout: PropTypes.element
    }),
    propGroups: {
      store: 'ignore',
      name: 'basic',
      label: 'basic',
      conditional: 'basic',
      layout: 'basic'
    }
  }
});