// import { actionTypes } from 'redux-form/immutable';
import { List } from 'immutable';
import { REGISTER_PAGE_FIELD, STORE_API_INFO, CHANGE_FIELD_VALUE } from 'redux/modules/actionTypes';
import { APP_CURRENT_PAGE, FORM_FIELD_KEY } from 'configs/appKeys';

const fieldReducers = {
  [ CHANGE_FIELD_VALUE ](state, { instancePath, payload }) {
    return state.mergeDeepIn([ ...instancePath, FORM_FIELD_KEY ], payload);
  },
  [ REGISTER_PAGE_FIELD ](state, { instancePath, field, payload }) {
    // console.log('register instancePath fielding.........', [ ...instancePath, FORM_FIELD_KEYS, field ]);
    const result = state.setIn([ ...instancePath, FORM_FIELD_KEY, field ], payload);
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
export const registerPageField = (instancePath, field, payload) =>
{
  return { type: REGISTER_PAGE_FIELD, instancePath, field, payload };
};

export const storeApiInfo = (instancePath, form, apiInfo, connectOptions) =>
{
  return { type: STORE_API_INFO, instancePath, form, apiInfo, connectOptions };
};

export const formValueChange = (instancePath, field, value) => {
  // console.log(instancePath, field, value);
  return { type: CHANGE_FIELD_VALUE, instancePath, field, value };
};

