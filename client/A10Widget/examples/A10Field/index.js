import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose  } from 'redux';
// import { combineReducers } from 'redux-immutable';
// import thunk from 'redux-thunk';

// import { Map } from 'immutable';
import {  Code, Markdown, Values } from 'redux-form-website-template';

import { createWidgetStore } from 'WidgetExport';

// import A10Widget Plugins
// import ApiClient from 'utils/ApiClient';
// import createMiddleware from 'middlewares/clientMiddleware';
// const client = new ApiClient();
// removed logger() because it's nonesense
// let middlewares = [ thunk,  createMiddleware(client) ];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const appReducer = combineReducers( { reducer } );
// const initialState = Map(); // eslint-disable-line ignore it

// const store = createStore(
//   appReducer,
//   initialState,
//   composeEnhancers(applyMiddleware(...middlewares))
// );

const store = createWidgetStore('app');

const dest = document.getElementById('content');

let render = () => {
  const Sandbox = require('./Sandbox').default;
  const readme = require('./Readme.md');
  const raw = require('!!raw!./Sandbox');

  ReactDOM.render(
    <Provider store={store}>
      <div>

        <Markdown content={readme}/>

        <h2>Form</h2>

        <Sandbox />

        <Values form="simple"/>

        <h2>Code</h2>

        <h4>Sandbox.js</h4>

        <Code source={raw}/>

      </div>
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
