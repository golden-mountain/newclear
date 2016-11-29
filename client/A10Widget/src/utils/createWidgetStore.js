import { createStore, applyMiddleware, compose  } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer } from '../modules';
import thunk from 'redux-thunk';
import { Map } from 'immutable';

// import A10Widget Plugins
import ApiClient from './ApiClient';
import createMiddleware from '../middlewares/clientMiddleware';

export const createWidgetStore = (rootName, restReducers={}, restMiddleWares=[]) => {
  const client = new ApiClient();
  // removed logger() because it's nonesense
  let middlewares = [ thunk,  createMiddleware(client), ...restMiddleWares ];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const appReducer = combineReducers( { [rootName] : reducer, ...restReducers } );
  const initialState = Map(); // eslint-disable-line ignore it

  const store = createStore(
    appReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
};

// export default createWidgetStore;
