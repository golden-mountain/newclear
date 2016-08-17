import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as form} from 'redux-form';

import axapi from './axapi';

export default combineReducers({
  routing: routerReducer,
  form,
  axapi
});
