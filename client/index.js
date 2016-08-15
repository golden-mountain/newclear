import { render } from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router/es6';
import rootRoute from 'pages/routes';
import 'index.html';
// import './theme/general.scss';

import { createStore, applyMiddleware } from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './redux/modules/reducer';
const middleware = [ thunk, logger() ];

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
