import React from 'react';
import connectToWrap from '../utils/wrapper';

const allComponents = require('components');
let wrappedComponents;
wrappedComponents = {};

const toComponent = (obj, enableWrap, props = {}) => {
  const {
    componentChildren,
    component
  } = obj;

  let reactComponent = component;
  if (typeof component === 'string') {
    const matchedComponent = allComponents[component];
    if (matchedComponent) {
      reactComponent = matchedComponent;
    }
  }
  if (enableWrap && obj.componentId !== 'root') {
    if (!wrappedComponents[component]) {
      wrappedComponents[component] = connectToWrap()(reactComponent);
    }
    reactComponent = wrappedComponents[component];
  }
  const reactComponentChildren = !componentChildren || typeof componentChildren === 'string' ? [componentChildren] : (componentChildren || []).map(item => toComponent(item, enableWrap, props));
  return React.createElement.apply(this, [reactComponent, Object.assign({}, obj, props, {key: obj.componentId}), ...reactComponentChildren]);
};

export default toComponent;
