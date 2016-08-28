// import Immutable from 'immutable';
import {
  LOCATION_CHANGE
} from 'react-router-redux';

const initialState = {
  locationBeforeTransitions: null
};

export default (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
  	// console.log(state);
    return Object.assign(state, {
      locationBeforeTransitions: action.payload
    });
  }

  return state;
};