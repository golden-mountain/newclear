import Immutable from 'immutable';
import {
  actionTypes
} from 'redux-form';

const initialState = Immutable.Map({});

export default (state = initialState, action) => {
  if (action.type === actionTypes.BLUR) {
  	console.log('catched blur state', action);    
  } else if (action.type === actionTypes.CHANGE) {
  	console.log('catched change state', action);    
  }

  console.log(state);
  return state;
};