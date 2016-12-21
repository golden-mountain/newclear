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
    componentChildren,
    component
  } = obj;

  let reactComponent = component;
  if (typeof component === 'string') {
    const matchedComponent = registeredComponents[component];
    if (matchedComponent) {
      reactComponent = matchedComponent;
    } else {
      console.error(`component ${component} is not found, use editableUtils.registerComponents to register component`);
    }
  }
  if (enableWrap && obj.componentId !== 'root') {
    if (!_cachedWrappedComponents[component]) {
      const { meta = {} } = reactComponent;
      _cachedWrappedComponents[component] = editableComponent(actions)(reactComponent, meta);
    }
    reactComponent = _cachedWrappedComponents[component];
  }
  const reactComponentChildren = !componentChildren || typeof componentChildren === 'string' ? [ 
    componentChildren 
  ] : (
    (componentChildren || []).map(item => jsonToComponent(item, enableWrap, props, actions))
  );

  return React.createElement
    .apply(this, [ 
      reactComponent, 
      Object.assign({}, obj, props, { key: obj.componentId }), ...reactComponentChildren 
    ]);
};

const deleteComponent = (schema, componentId) => {
  return {
    ...schema,
    componentChildren: !schema.componentChildren || typeof schema.componentChildren === 'string' ? schema.componentChildren :
      schema.componentChildren.filter(item => item.componentId !== componentId)
      .map(item => {
        return deleteComponent(item, componentId);
      })
  };
};

const updateComponent = (schema, componentId, component) => {
  return {
    ...schema,
    componentChildren: !schema.componentChildren || typeof schema.componentChildren === 'string' ? schema.componentChildren :
      schema.componentChildren
      .map(item => {
        if ( item.componentId === componentId) {
          Object.assign(item, component);
        }
        return updateComponent(item, componentId, component);
      })
  };
};

const moveComponent = (schema, dragComponent, dropComponentId, isNew, newPosition) => {
  if (isNew && !dragComponent.componentId) {
    dragComponent.componentId = _.uniqueId();
  }
  const modifiedChildren = !schema.componentChildren || typeof schema.componentChildren === 'string' ? schema.componentChildren :
    schema.componentChildren.filter(item => item.componentId !== dragComponent.componentId)
    .map(item => moveComponent(item, dragComponent, dropComponentId, isNew, newPosition))
    .reduce((prev, current) => {
      if (current.componentId === dropComponentId) {
        if (newPosition === 'inside') {
          current.componentChildren = current.componentChildren || [];
          current.componentChildren = [ ...current.componentChildren, dragComponent ];
        } else {
          return newPosition === 'before' ? [ ...prev, dragComponent, current ] : [ ...prev, current, dragComponent ];
        }
      } else if (current.componentId === dragComponent.id) {
        return prev;
      }
      return [ ...prev, current ];
    }, []);
  return {
    ...schema,
    componentChildren: modifiedChildren
  };
};

const toJSX = (schema, indent = 0) =>{
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

  if (!schema.componentChildren) {
    return `\n${indention}<${schema.component} ${propsString} />`;
  }
  return `\n${indention}<${schema.component}${propsString ? ' ' + propsString : ''}>${
  typeof schema.componentChildren !== 'string' ?
    schema.componentChildren.map(child=> toJSX(child, indent + 1)).join('') : '\n' + indention + '  ' + schema.componentChildren
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

export default DemoPage;`;
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
