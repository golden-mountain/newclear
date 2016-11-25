import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';

import { reducers } from 'WidgetExport';
import { App, Code, Markdown, Values, generateExampleBreadcrumbs } from 'redux-form-website-template';

const dest = document.getElementById('content');

const reducer = combineReducers(reducers);
const initialState = Map(); // eslint-disable-line ignore it

const store =
  (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer, initialState);

let render = () => {
  const Sandbox = require('./Sandbox').default;
  const readme = require('./Readme.md');
  const raw = require('!!raw!./Sandbox');

  ReactDOM.render(
    <Provider store={store}>
      <App
        /**
        * This <App/> component only provides the site wrapper.
        * Remove it on your dev server if you wish. It will not affect the functionality.
        */
        version="6.0.1"
        path="/examples/simple"
        breadcrumbs={generateExampleBreadcrumbs('simple', 'Simple Form Example', '6.0.1')}>

        <Markdown content={readme}/>

        <h2>Form</h2>

        <Sandbox />

        <Values form="simple"/>

        <h2>Code</h2>

        <h4>Sandbox.js</h4>

        <Code source={raw}/>

      </App>
    </Provider>,
    dest
  );
};

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render;
  const renderError = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(
      <RedBox error={error} className="redbox"/>,
      dest
    );
  };

  render = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };

  const rerender = () => {
    setTimeout(render);
  };

  module.hot.accept('./Sandbox', rerender);
  module.hot.accept('./Readme.md', rerender);
  module.hot.accept('!!raw!./Sandbox', rerender);
}

render();
