import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
// import { Router, browserHistory } from 'react-router/es6';
// import { syncHistoryWithStore } from 'react-router-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import Immutable, { Iterable } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import installDevTools from 'immutable-devtools';
import Perf from 'react-addons-perf';

import RootRouter from './routes';
// import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import createMiddleware from './redux/middleware/clientMiddleware';
import formMiddleware from './redux/middleware/formMiddleware';
import reducer from './redux/modules/reducer';
// Immutable js
import './index.ejs';

// api client middleware
const client = new ApiClient();

// removed logger() because it's nonesense
let middlewares = [ thunk,  createMiddleware(client), formMiddleware ];

//webpack define plugin defined env
if (__DEV__) { // eslint-disable-line
  // logger middleware
  const transformer = (state) => {
    if (Iterable.isIterable(state)) return state.toJS();
    else return state;
  };
  const logger = createLogger({
    stateTransformer: transformer,
    actionTransformer: transformer,
    collapsed: true,
    diff: true,
    duration : true
  });

  middlewares.push(logger);

  installDevTools(Immutable);

  window.Perf = Perf;
}


const initialState = Immutable.Map(); // eslint-disable-line ignore it
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares)
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


render(
  <Provider store={store} key="provider">
    <RootRouter />
  </Provider>,
  document.getElementById('root')
);
