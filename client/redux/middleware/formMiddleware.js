import { actionTypes } from 'redux-form/immutable'; 
import { Map } from 'immutable';
import { isEqual } from 'lodash';
import { getFormVar, getPageVar } from 'helpers/stateHelper';
import { APP_CURRENT_PAGE } from 'configs/appKeys';

let lastValues = null;

const validate = (pageVar, reduxFormVar) => {
  let result = Map({});
  const pageValidators = pageVar.getIn([ 'form' ]);
  pageValidators.forEach((v, k) => {
    if (v.validations) {
      const elementValue = reduxFormVar.getIn( [ 'values', ...k.split('.') ]);      
      Object.entries(v.validations).forEach(([ name, func ]) => { // eslint-disable-line
        const msg = func(elementValue, k, reduxFormVar, pageVar);
        if (msg) {
          result = result.setIn(k.split('.'), msg);
          return msg;
        }
      });
    }
  });
  return result.toJS();
};

export default ({ getState }) => { // eslint-disable-line dispatch //
  return next => action => {
    const state = getState();
    const pageEnv = state.getIn([ 'app', APP_CURRENT_PAGE ]);
    if (pageEnv) {
      const pageVar = getPageVar(state, pageEnv.page);
      const reduxFormVar = getFormVar(state, pageEnv.form);
      const thisValues = reduxFormVar.getIn([ 'values' ]);
      if (pageVar && reduxFormVar && !isEqual(thisValues, lastValues)) {
        lastValues = thisValues;
        const syncErrors = validate(pageVar, reduxFormVar);
        console.log(syncErrors);
        next({ type: actionTypes.UPDATE_SYNC_ERRORS, meta: { form: 'virtualServerForm' }, payload: { syncErrors, error: {} } });
      }
    }
    
    // console.log('............. on form middleware ...............', getState().toJS(), 'state',  action, 'action');    
    return next(action);
  };
};
