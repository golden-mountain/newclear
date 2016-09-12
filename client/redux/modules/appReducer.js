/* eslint-disable */
import _ from 'lodash';
import Immutable from 'immutable';

const initialState = {
  app: {

  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE:
      return Immutable.Map({
        ...state
      });

  
    default:
      // console.log('default reducer');
      return Immutable.Map(state);
  }
}

// layout
// adc.virtual-server.edit
function changeLayout(appPath, name) {

}

function sayLayout(appPath, name) {

}

// model
function save(appPath, data) {

}


export {
  changeLayout,
  sayLayout,
  save
};
