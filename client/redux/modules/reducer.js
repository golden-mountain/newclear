import { combineReducers } from 'redux';
// import routerReducer from './rootReducer';
// import switcherReducer from './switcherReducer';
import { reducer as form } from 'redux-form';
import { modelReducer, formReducer } from 'react-redux-form';
// import Immutable from 'immutable';

import axapi from './axapi';

const initialAdcState = {

  'virtual-server': {
  	'name': 'vs1',
  	'wildcard': false,
  	'ip-address': '192.168.1.1',
  	'netmask': '/24',
  }

};

const initialAPIValues = {
  path: '/axapi/v3/auth',
	method: 'POST',
	body: {credentials: {username: 'admin', password: 'a10'}}
};

// console.log(modelReducer('adc', initialAdcState), 'model reducer ');

const rootReducers = combineReducers({
  // routing: routerReducer,
  axapi,
  adc: modelReducer('adc', initialAdcState),
  adcForm: formReducer('adc', initialAdcState),
  api: modelReducer('api', initialAPIValues),
  apiForm: formReducer('api', initialAPIValues)

});

export default rootReducers;
