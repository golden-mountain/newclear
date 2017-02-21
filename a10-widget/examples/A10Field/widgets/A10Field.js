import React, { Component, PropTypes } from 'react';
import A10Field from '../../../src/widgets/A10Field';
import { Col, Row, Panel, Radio, Checkbox, FormControl } from 'react-bootstrap';

import { widgetWrapper } from 'widgetWrapper';

function MyA10Input({ ...props }) {
  return (
    <A10Field {...props}/>
  );
}

export const A10Input = widgetWrapper(['app'])(MyA10Input, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Field',
      name: 'A10Input',
      component: 'A10Input',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: {
      name: 'A10Field',
      label: 'A10Field',
      type: 'input',
      value: '',
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


function MyA10Checkbox({ ...props }) {
  const fieldProps = { ...props };
  const value = fieldProps.value;
  delete fieldProps.value;
  return (
    <A10Field {...fieldProps}>
      <input type="checkbox" value={value} />
    </A10Field>
  );
}

export const A10Checkbox = widgetWrapper(['app'])(MyA10Checkbox, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Field',
      name: 'A10Checkbox',
      component: 'A10Checkbox',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: {
      name: 'A10Field',
      label: 'A10Field'
    },
    propTypes: Object.assign({}, A10Field.propTypes, {
      name: PropTypes.object.isRequired,
      label: PropTypes.object.isRequired,
      value: PropTypes.bool,
      conditional: PropTypes.object,
      layout: PropTypes.element
    }),
    propGroups: {
      store: 'ignore',
      name: 'basic',
      label: 'basic',
      value: 'basic',
      conditional: 'basic',
      layout: 'basic'
    }
  }
});


function MyA10Radio({ ...props }) {
  const fieldProps = { ...props };
  const { options, titles } = fieldProps;

  delete fieldProps.options;
  delete fieldProps.titles;

  return (
    <A10Field {...fieldProps}>
      <div>
        {
          options.map((option, index) => {
            const title = titles[index] || option;
            return (
              <Radio value={option} inline>{title}</Radio>
            );
          })
        }
      </div>
    </A10Field>
  );
}

export const A10Radio = widgetWrapper(['app'])(MyA10Radio, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Field',
      name: 'A10Radio',
      component: 'A10Radio',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: {
      name: 'A10Field',
      label: 'A10Field',
      type: 'input',
      options: [],
      titles: []
    },
    propTypes: Object.assign({}, A10Field.propTypes, {
      name: PropTypes.object.isRequired,
      label: PropTypes.object.isRequired,
      conditional: PropTypes.object,
      layout: PropTypes.element,
      value: PropTypes.string.isRequired,
      options: PropTypes.array.isRequired,
      titles: PropTypes.array.isRequired
    }),
    propGroups: {
      store: 'ignore',
      name: 'basic',
      label: 'basic',
      options: 'basic',
      titles: 'basic',
      conditional: 'basic',
      layout: 'basic'
    }
  }
});


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
      name: 'A10Field',
      label: 'A10Field',
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
      name: 'A10Field',
      label: 'A10Field',
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
