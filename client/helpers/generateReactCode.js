function toJSX(schema, indent = 0) {
  const props = Object.assign({}, schema, {
    _isNew: null,
    _isContainer: null,
    component: null,
    componentId: null,
    componentChildren: null,
    editingComponentId: null,
    children: null,
    isDragging: null
  });
  const indention = ' '.repeat(indent * 2);

  const propsString = Object.keys(props)
    .filter(prop => props[prop] !== null && typeof props[prop] !== 'function')
    .filter(prop => !(typeof props[prop] === 'object' && Object.keys(props[prop]).length === 0))
    .map(prop => {
      let result = `${prop}=`;
      const value = props[prop];
      switch (typeof props[prop]) {
        case 'object':
          result += `{${JSON.stringify(value)}}`;
          break;
        case 'string':
          result += `"${value}"`;
          break;
        case 'number':
        case 'bool':
        default:
          result += `{${value}}`;
      }
      return result;
    })
    .join('\n  ' + indention);

  if (!schema.componentChildren) {
    return `\n${indention}<${schema.component} ${propsString} />`;
  }
  return `\n${indention}<${schema.component}${propsString ? ' ' + propsString : ''}>${
  typeof schema.componentChildren !== 'string' ?
    schema.componentChildren.map(child=> toJSX(child, indent + 1)).join('') : '\n' + indention + '  ' + schema.componentChildren
  }\n${indention}</${schema.component}>`;
}

const generateReactCode = (jsx) => {
  return `import React from 'react';

const DemoPage = React.createClass({

  render() {
    return (${jsx.split('\n').join('\n      ')}
    );
  }

});

export default DemoPage;`;
};

export function generateReactCodeFromSchema(schema) {
  return generateReactCode(toJSX(schema));
}
