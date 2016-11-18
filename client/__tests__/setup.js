import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';

import RootRouter from './routes';
import ApiClient from './helpers/ApiClient';
import createMiddleware from './redux/middleware/clientMiddleware';
import reducer from './redux/modules/reducer';

// if not import here, found we can't dispatch things
// maybe things will bound twice
import appActions from 'redux/modules/app/index';
window.appActions = appActions;

export const createDom = () => {
  const client = new ApiClient();
  let middlewares = [ thunk,  createMiddleware(client) ];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const initialState = Immutable.Map(); // eslint-disable-line ignore it
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return (
    <Provider store={store} key="provider">
      <RootRouter />
    </Provider>
  );
};
