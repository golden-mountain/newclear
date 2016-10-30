// import { actionTypes } from 'redux-form/immutable';
import { List } from 'immutable';
import { REGISTER_PAGE_FIELD, STORE_API_INFO, CHANGE_FIELD_CONDITIONAL, TRIGGLE_VALIDATION  } from 'redux/modules/actionTypes';
import { APP_CURRENT_PAGE, FORM_FIELD_KEY } from 'configs/appKeys';

const fieldReducers = {
  [ CHANGE_FIELD_CONDITIONAL ](state, { parentPath, payload }) {
    // console.log(parentPath, payload);
    return state.mergeDeepIn([ ...parentPath, FORM_FIELD_KEY ], payload);
  },
  [ REGISTER_PAGE_FIELD ](state, { parentPath, field, payload }) {
    // console.log('register instancePath fielding.........', [ ...instancePath, FORM_FIELD_KEYS, field ]);
    const result = state.setIn([ ...parentPath, FORM_FIELD_KEY, field ], payload);
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
  },
  [ TRIGGLE_VALIDATION ](state, { parentPath, field, value }) { // eslint-disable-line
    // console.log(parentPath, field, value);
    return state;
  }
};

export default fieldReducers;

// -------------------- Field Actions --------------------
export const registerPageField = (instancePath, parentPath, field, payload) =>
{
  return { type: REGISTER_PAGE_FIELD, instancePath, parentPath, field, payload };
};

export const storeApiInfo = (instancePath, parentPath, form, apiInfo, connectOptions) =>
{
  return { type: STORE_API_INFO, instancePath, parentPath, form, apiInfo, connectOptions };
};

export const setFieldConditial = (instancePath, parentPath, field, value) => {
  // console.log(instancePath,parentPath, field, value);
  return { type: CHANGE_FIELD_CONDITIONAL, instancePath, parentPath, field, value };
};

export const triggleValidation = (instancePath, parentPath, field, value) => {
  // console.log(instancePath, parentPath, field, value);
  return { type: TRIGGLE_VALIDATION, instancePath, parentPath, field, value };
};
