import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as form} from 'redux-form';

// import apiTester from './apiTester';

// console.log(routerReducer, form, apiTester);
export default combineReducers({
  routing: routerReducer,
  form
  // apiTester
});
