import { render } from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router/es6';
import rootRoute from 'routes';
// import createStore from './redux/create';
import { syncHistoryWithStore } from 'react-router-redux';
import 'index.ejs';

import ApiClient from './helpers/ApiClient';
const client = new ApiClient();

import { createStore, applyMiddleware } from 'redux'
import createMiddleware from './redux/middleware/clientMiddleware';
import switchMiddleware from './redux/middleware/switchMiddleware';

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './redux/modules/reducer';
const middleware = [ thunk, logger(), createMiddleware(client), switchMiddleware ];

// Immutable js
import Immutable from 'immutable';
const initialState = Immutable.Map();
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
)

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState (state) {
    return state.get('routing').toJS();
  }
});



render(
  <Provider store={store} key="provider">
  	<Router history={history} routes={rootRoute} />
  </Provider>,
  document.getElementById('root')
);
