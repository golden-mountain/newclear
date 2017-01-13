import React from 'react';
import _ from 'lodash';
import editableComponent from './editableComponent';


let registeredComponents = {};
const registerComponents = (componentsDict) => {
// registerComponents before you start to use jsonToComponent
// example:
// import ContainerWidget from '../../../examples/A10Field/components/ContainerWidget';
// import NotEditableCom  from '../../../examples/A10Field/components/NotEditableCom';
// import EditableCom     from '../../../examples/A10Field/components/EditableCom';
// import FieldCheckbox   from '../../../examples/A10Field/components/FieldCheckbox';
// editableUtils.registerComponents({
//   ContainerWidget,
//   NotEditableCom,
//   EditableCom,
//   FieldCheckbox
// });
  registeredComponents = Object.assign({}, componentsDict);
};


let _cachedWrappedComponents;
_cachedWrappedComponents = {};

const jsonToComponent = (obj, enableWrap = false, props = {}, actions = {}) => {
  const {
    schemaChildren,
    component
  } = obj;

  let reactComponent = component;
  if (typeof component === 'string' ) {
    const matchedComponent = component[0] === component[0].toUpperCase() ? registeredComponents[component] : component;
    if (matchedComponent) {
      reactComponent = matchedComponent;
    } else {
      console.error(`component ${component} is not found, use editableUtils.registerComponents to register component`);
    }
  }
  if (enableWrap) {
    if (!_cachedWrappedComponents[component]) {
      const { meta = {} } = reactComponent;
      _cachedWrappedComponents[component] = editableComponent(actions)(reactComponent, meta);
    }
    reactComponent = _cachedWrappedComponents[component];
  }
  const reactComponentChildren = !schemaChildren || typeof schemaChildren === 'string' ? [ 
    schemaChildren 
  ] : (
    (schemaChildren || []).map(item => jsonToComponent(item, enableWrap, props, actions))
  );

  return React.createElement
    .apply(this, [ 
      reactComponent, 
      Object.assign({}, obj, props, { key: obj._componentId }), ...reactComponentChildren 
    ]);
};

const deleteComponent = (schema, _componentId) => {
  return {
    ...schema,
    schemaChildren: !schema.schemaChildren || typeof schema.schemaChildren === 'string' ? schema.schemaChildren :
      schema.schemaChildren.filter(item => item._componentId !== _componentId)
      .map(item => {
        return deleteComponent(item, _componentId);
      })
  };
};

const updateComponent = (schema, _componentId, component) => {
  return {
    ...schema,
    schemaChildren: !schema.schemaChildren || typeof schema.schemaChildren === 'string' ? schema.schemaChildren :
      schema.schemaChildren
      .map(item => {
        if ( item._componentId === _componentId) {
          Object.assign(item, component);
        }
        return updateComponent(item, _componentId, component);
      })
  };
};

const moveComponent = (schema, dragComponent, dropComponentId, isNew, newPosition) => {
  if (isNew && !dragComponent._componentId) {
    dragComponent._componentId = _.uniqueId();
  }
  if (dropComponentId === 'root') {
    let schemaChildren = schema.schemaChildren || [];
    return {
      ...schema,
      schemaChildren: [ ...schemaChildren, dragComponent ]
    };
  }
  const modifiedChildren = !schema.schemaChildren || typeof schema.schemaChildren === 'string' ? schema.schemaChildren :
    schema.schemaChildren.filter(item => item._componentId !== dragComponent._componentId)
    .map(item => moveComponent(item, dragComponent, dropComponentId, isNew, newPosition))
    .reduce((prev, current) => {
      if (current._componentId === dropComponentId) {
        if (newPosition === 'inside') {
          current.schemaChildren = current.schemaChildren || [];
          current.schemaChildren = [ ...current.schemaChildren, dragComponent ];
        } else {
          return newPosition === 'before' ? [ ...prev, dragComponent, current ] : [ ...prev, current, dragComponent ];
        }
      } else if (current._componentId === dragComponent.id) {
        return prev;
      }
      return [ ...prev, current ];
    }, []);
  return {
    ...schema,
    schemaChildren: modifiedChildren
  };
};

const toJSX = (schema, indent = 0) =>{
  const props = Object.assign({}, schema, {
    _isNew: null,
    _isContainer: null,
    _componentId: null,
    _isRoot: null,
    component: null,
    children: null,
    editingComponentId: null,
    isDragging: null
  });
  const indention = ' '.repeat(indent * 2);

  const propsString = Object.keys(props)
    .filter(prop => props[prop] !== null && typeof props[prop] !== 'function' && prop !== 'schemaChildren')
    .filter(prop => !(typeof props[prop] === 'object' && Object.keys(props[prop]).length === 0))
    .map(prop => {
      let result = `${prop}=`;
      const value = props[prop];
      switch (typeof props[prop]) {
        case 'object':
          result += `{${JSON.stringify(value, null, 2 + indent*2)}}`;
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

  if (!schema.schemaChildren) {
    return `\n${indention}<${schema.component} ${propsString} />`;
  }
  return `\n${indention}<${schema.component}${propsString ? ' ' + propsString : ''}>${
  typeof schema.schemaChildren !== 'string' ?
    schema.schemaChildren.map(child=> toJSX(child, indent + 1)).join('') : '\n' + indention + '  ' + schema.schemaChildren
  }\n${indention}</${schema.component}>`;
};

const generateReactCode = (jsx) => {
  return `import React from 'react';

const DemoPage = React.createClass({

  render() {
    return (${jsx.split('\n').join('\n      ')}
    );
  }

});

export default DemoPage;`.replace(/RootWidget/g, 'div');
};

const generateReactCodeFromSchema = (schema) => generateReactCode(toJSX(schema));


export default {
  registerComponents,
  jsonToComponent,
  moveComponent,
  deleteComponent,
  updateComponent,
  generateReactCodeFromSchema
};
