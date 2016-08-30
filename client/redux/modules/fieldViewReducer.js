import Immutable from 'immutable';
import actionTypes from '../actionTypes';

const initialState = {};

export default (state = initialState, action) => {
  // console.log(action);
  // let newState = state;
  switch (action.type) {
    case actionTypes.UPDATE:
      return Immutable.fromJS({
        // ...state,
        model: action.model,
        value: action.viewValue
      });

    default:
      return Immutable.fromJS({
        // ...state,
        model: action.model,
        value: true
      });    
  }

};

export function viewEdit(model, value) {
  return {
    type: actionTypes.UPDATE,
    model: model,
    value: value
  }
}
