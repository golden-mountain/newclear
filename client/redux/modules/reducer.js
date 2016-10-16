import { combineReducers } from 'redux-immutable';
import app from './app';
// import routerReducer from './rootReducer';
import { reducer as form } from 'redux-form/immutable';

// import axapi from './axapi';

const rootReducers = combineReducers({
  // routing: routerReducer,
  form,
  // axapi, 
  app
});

export default rootReducers;
