import { combineReducers } from 'redux-immutable';
import routerReducer from './rootReducer';
import { reducer as form } from 'a10-redux-form/immutable';

import axapi from './axapi';

const rootReducers = combineReducers({
  routing: routerReducer,
  form,
  axapi
});

export default rootReducers;
