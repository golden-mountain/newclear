import { combineReducers } from 'redux-immutable';
import routerReducer from './rootReducer';
import switcherReducer from './switcherReducer';
import { reducer as form } from 'redux-form/immutable';

import axapi from './axapi';

const rootReducers = combineReducers({
  routing: routerReducer,
  form,
  axapi,
  switcher: switcherReducer
});

export default rootReducers;
