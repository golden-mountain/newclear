// import { actionTypes } from 'redux-form/immutable'; 
import { List } from 'immutable';
import { REGISTER_PAGE_FIELD, SYNC_PAGE_FIELD, STORE_API_INFO } from 'redux/modules/actionTypes';
import { APP_CURRENT_PAGE } from 'configs/appKeys';

const fieldReducers = {
  [ REGISTER_PAGE_FIELD ](state, { page, field, payload }) {
    console.log('register page fielding.........');
    const result = state.setIn([ page, 'form', field ], payload);
    return result;
  },
  [ SYNC_PAGE_FIELD ](state, { page, payload }) {
    const result = state.mergeDeepIn([ page, 'form' ], payload);
    // console.log('mergedresult', result);
    return result;
  },
  [ STORE_API_INFO ](state, { form, apiInfo, connectOptions }) {
    if (!apiInfo) {
      return state.deleteIn([ APP_CURRENT_PAGE, 'store' ]);
    } else {
      let old = state.getIn([ APP_CURRENT_PAGE, 'store', form ], List());
      apiInfo = apiInfo.map((value) => {
        value.connectOptions = connectOptions;
        return value;
      });
      // apiInfo.connectOptions = connectOptions;
      old = old.concat(apiInfo);
      return state.setIn([ APP_CURRENT_PAGE, 'store', form ], old);
    }
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

export const storeApiInfo = (page, form, apiInfo, connectOptions) => 
{ 
  return { type: STORE_API_INFO, page, form, apiInfo, connectOptions };
};

// /* eslint-disable no-unused-vars */
// export const updateReduxFormSyncErrors = (page, form, syncErrors = {}, error) =>
//   ({ type: actionTypes.UPDATE_SYNC_ERRORS, meta: { form }, payload: { syncErrors, error } });
// /* eslint-enable no-unused-vars */
