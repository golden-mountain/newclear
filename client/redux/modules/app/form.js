import { actionTypes } from 'redux-form/immutable'; 

// field action
const REGISTER_PAGE_FIELD = 'page/fields/REGISTER_PAGE_FIELD';
// const UPDATE_SYNC_ERRORS = 'page/fields/REGISTER_PAGE_FIELD';

const fieldReducers = {
  [ REGISTER_PAGE_FIELD ](state, { page, field, payload }) {
    const result = state.setIn([ page, 'form', field ], payload);
    // console.log('registering', result);
    return result;
  }
};

export default fieldReducers;

// -------------------- Field Actions --------------------
export const registerPageField = (page, field, payload) => 
{ 
  return { type: REGISTER_PAGE_FIELD, page, field, payload };
};

/* eslint-disable no-unused-vars */
export const updateReduxFormSyncErrors = (page, form, syncErrors = {}, error) =>
  ({ type: actionTypes.UPDATE_SYNC_ERRORS, meta: { form }, payload: { syncErrors, error } });
/* eslint-enable no-unused-vars */
