import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router/es6';
import { syncHistoryWithStore } from 'react-router-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import { createStore, applyMiddleware } from 'redux';

import rootRoute from './routes';
// import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import createMiddleware from './redux/middleware/clientMiddleware';
import switchMiddleware from './redux/middleware/switchMiddleware';
import reducer from './redux/modules/reducer';
// Immutable js
import './index.ejs';

const client = new ApiClient();

const middleware = [ thunk, logger(), createMiddleware(client), switchMiddleware ];

const initialState = Immutable.Map(); // eslint-disable-line ignore it
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

// function handleChange() {
//   const currentValue = store.getState();
//   console.log('Some deep nested property changed from', currentValue.toJS());
// }
// store.subscribe(handleChange)

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toJS();
  }
});


render(
  <Provider store={store} key="provider">
    <Router history={history} routes={rootRoute} />
  </Provider>,
  document.getElementById('root')
);
