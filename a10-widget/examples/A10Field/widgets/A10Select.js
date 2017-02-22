import React, { Component, PropTypes } from 'react';
import A10Field from '../../../src/widgets/A10Field';
import { Col, Row, Panel, Radio, Checkbox, FormControl } from 'react-bootstrap';

import { widgetWrapper } from 'widgetWrapper';

function MyA10Select({ ...props }) {
  const fieldProps = { ...props };
  const { defaultValue, options } = fieldProps;

  delete fieldProps.defaultValue;
  delete fieldProps.options;

  return (
    <A10Field {...fieldProps}>
      <FormControl componentClass="select" defaultValue={defaultValue}>
        {
          options.map((value) => {
            return (
              <option value={value}>{value}</option>
            );
          })
        }
      </FormControl>
    </A10Field>
  );
}

export const A10Select = widgetWrapper(['app'])(MyA10Select, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Field',
      name: 'A10Select',
      component: 'A10Select',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: {
      name: 'A10Select',
      label: 'A10Select',
      type: 'input',
      options: []
    },
    propTypes: Object.assign({}, A10Field.propTypes, {
      name: PropTypes.object.isRequired,
      label: PropTypes.object.isRequired,
      conditional: PropTypes.object,
      layout: PropTypes.element,
      options: PropTypes.array.isRequired
    }),
    propGroups: {
      store: 'ignore',
      name: 'basic',
      label: 'basic',
      conditional: 'basic',
      layout: 'basic',
      options: 'basic'
    }
  }
});
