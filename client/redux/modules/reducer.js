import { combineReducers } from 'redux-immutable';
import routerReducer from './rootReducer';
// import switcherReducer from './switcherReducer';
import { reducer as form } from 'redux-form/immutable';
// import { modelReducer, formReducer } from 'react-redux-form';
// import Immutable from 'immutable';

import axapi from './axapi';

// const initialAdcState = Immutable.Map({
//   firstName: '',
//   lastName: ''
// });

// console.log(modelReducer('adc', initialAdcState), 'model reducer ');

const rootReducers = combineReducers({
  routing: routerReducer,
  form,
  axapi
  // switcher: switcherReducer,
  // adc: modelReducer('adc', initialAdcState),
  // adcForm: formReducer('adc', initialAdcState)

});

export default rootReducers;
