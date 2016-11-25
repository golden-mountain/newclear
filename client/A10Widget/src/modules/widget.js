import {
  REGISTER_COMPONENT_VISIBLE, REGISTER_COMPONENT_DATA, UNMOUNT_COMPONENT
} from './actionTypes';
// import { APP_CURRENT_PAGE } from 'configs/appKeys';
import { fromJS, Map } from 'immutable';

const componentReducers = {
  // [ 'tst' ](state, { instancePath, payload }) {
  //   console.log(instancePath, payload);
  //   return state;
  // },
  [ REGISTER_COMPONENT_DATA ](state, { instancePath, payload }) {
    // console.log(instancePath, payload);
    let result = state.getIn(instancePath, Map());
    result = result.mergeDeep(fromJS(payload));
    return state.setIn(instancePath, result);
  },
  [ REGISTER_COMPONENT_VISIBLE ](state, { instancePath, visible }) {
    return state.setIn([ ...instancePath, 'visible' ], visible);
  },
  [ UNMOUNT_COMPONENT ](state, { instancePath }) {
    return state.deleteIn(instancePath);
  }
};

export default componentReducers;

export const setComponentVisible = (instancePath, visible) => {
  return { type: REGISTER_COMPONENT_VISIBLE, instancePath, visible };
};

export const setComponentState = (instancePath, payload) => {
  return { type: REGISTER_COMPONENT_DATA, instancePath, payload };
};

export const unmountComponent = (instancePath) => {
  return { type: UNMOUNT_COMPONENT, instancePath };
};

// export const setComponentData = (instancePath, payload) => {
//   // console.log(instancePath, payload);
//   return { type: 'tst', instancePath, payload };
// };
