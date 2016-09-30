import { actionTypes } from 'redux-form/immutable'; 

import { REGISTER_PAGE_FIELD, SYNC_PAGE_FIELD } from 'redux/modules/actionTypes';

const fieldReducers = {
  [ REGISTER_PAGE_FIELD ](state, { page, field, payload }) {
    const result = state.setIn([ page, 'form', field ], payload);
    return result;
  },
  [ SYNC_PAGE_FIELD ](state, { page, payload }) {
    const result = state.mergeDeepIn([ page, 'form' ], payload);
    console.log('mergedresult', result);
    return result;
  }
};

export default fieldReducers;

// -------------------- Field Actions --------------------
export const registerPageField = (page, field, payload) => 
{ 
  return { type: REGISTER_PAGE_FIELD, page, field, payload };
};

export const syncPageField = (page, payload) => 
{ 
  return { type: SYNC_PAGE_FIELD, page, payload };
};

/* eslint-disable no-unused-vars */
export const updateReduxFormSyncErrors = (page, form, syncErrors = {}, error) =>
  ({ type: actionTypes.UPDATE_SYNC_ERRORS, meta: { form }, payload: { syncErrors, error } });
/* eslint-enable no-unused-vars */
