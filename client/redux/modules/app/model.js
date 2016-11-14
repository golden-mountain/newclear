// // theme action
// import { MODEL_HOLD_DATA, MODEL_HOLD_META } from 'redux/modules/actionTypes';
//
// const themeReducers = {
//   [ MODEL_HOLD_DATA ](state, { instancePath, data }) {
//     return state.setIn([ ...instancePath, 'data' ], data);
//   },
//   [ MODEL_HOLD_META ](state, { instancePath, meta }) {
//     return state.setIn([ ...instancePath, 'meta' ], meta);
//   }
// };
//
// export default themeReducers;
//
// // -------------------- Model Actions --------------------
// export const modelHoldData = (instancePath, data) => {
//   return { type: MODEL_HOLD_DATA, instancePath, data };
// };
//
// export const modeHoldMeta = (instancePath, meta) => {
//   return { type: MODEL_HOLD_META, instancePath, meta };
// };
