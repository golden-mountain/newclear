/* eslint-disable */
import Immutable from 'immutable';
import {
  actionTypes
} from 'redux-form';

const initialState = Immutable.fromJS({});

export default (state = initialState, action) => {
	// console.log(action);
  if (action.type === actionTypes.BLUR) {
  	// console.log('catched blur state', action);    
  } else if (action.type === actionTypes.CHANGE) {
  	// newState = newState.setIn(['switcher', 'adc'], 'test');
  }

  // console.log(newState.toJS());
  return newState;
};
