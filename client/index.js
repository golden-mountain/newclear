import React from 'react';
import { Provider } from 'react-redux';
// import { Router, browserHistory } from 'react-router/es6';
// import { syncHistoryWithStore } from 'react-router-redux';
// import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import installDevTools from 'immutable-devtools';
import Perf from 'react-addons-perf';

import RootRouter from './routes';
// import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import createMiddleware from './redux/middleware/clientMiddleware';
// import formMiddleware from './redux/middleware/formMiddleware';
import reducer from './redux/modules/reducer';
import { createDomElement } from 'helpers/dom';

// Immutable js
import './index.ejs';

// if not import here, found we can't dispatch things
// maybe things will bound twice
import appActions from './redux/modules/app/index';
window.appActions = appActions;

// api client middleware
const client = new ApiClient();

// removed logger() because it's nonesense
let middlewares = [ thunk,  createMiddleware(client) ];

//webpack define plugin defined env
if (__DEV__) { // eslint-disable-line
  // logger middleware
  // const transformer = (state) => {
  //   if (Iterable.isIterable(state)) return state.toJS();
  //   else return state;
  // };
  // const logger = createLogger({
  //   stateTransformer: transformer,
  //   actionTransformer: transformer,
  //   collapsed: true,
  //   diff: true,
  //   duration : true
  // });

  // middlewares.push(logger);

  installDevTools(Immutable);

  window.Perf = Perf;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = Immutable.Map(); // eslint-disable-line ignore it
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

// function handleChange() {
//   const currentValue = store.getState();
//   console.log('Some deep nested property changed from', currentValue.toJS());
// }
// store.subscribe(handleChange)

// const history = syncHistoryWithStore(browserHistory, store, {
//   selectLocationState(state) {
//     return state.get('routing').toJS();
//   }
// });


createDomElement(
  <Provider store={store} key="provider">
    <RootRouter />
  </Provider>,
  'root'
);
