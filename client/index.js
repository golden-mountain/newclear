import { render } from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router/es6';
import rootRoute from 'routes';
// import createStore from './redux/create';

import 'index.html';

import ApiClient from './helpers/ApiClient';
const client = new ApiClient();

import { createStore, applyMiddleware } from 'redux'
import createMiddleware from './redux/middleware/clientMiddleware';

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './redux/modules/reducer';
const middleware = [ thunk, logger(), createMiddleware(client) ];

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render(
  <Provider store={store} key="provider">
  	<Router history={browserHistory} routes={rootRoute} />
  </Provider>,
  document.getElementById('root')
);
