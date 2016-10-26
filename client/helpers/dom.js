import React from 'react'; //PropTypes
import { render } from 'react-dom';

export const createDomElement = (component, id='root') => {
  render(component, document.getElementById(id));
};

export const renderComponent = (componentClass, props, id='root') => {
  const component = React.createElement(componentClass, props );
  return createDomElement(component, id);
};
