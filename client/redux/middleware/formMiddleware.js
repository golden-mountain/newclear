import { actionTypes } from 'redux-form/immutable'; 
import { Map } from 'immutable';
// import { isEqual } from 'lodash';
import { getFormVar, getPageVar } from 'helpers/stateHelper';
import { APP_CURRENT_PAGE } from 'configs/appKeys';

import { REGISTER_PAGE_FIELD } from 'redux/modules/actionTypes'; //CHANGE

// // only for conditional name interation
// export const formatCondName = name => name.replace(/\./g, ':').replace(/\[(.+?)\]/g, '#$1')
// export const unformatCondName = name => name.replace(/:/g, '.').replace(/#(.+?)/g, '[$1]')

// const pa = (state, name, conditional, cachedValue) => {
//       // caculate visible
//     let isVisible = true;
//     const depName = result.dependOn;
//     const depValue = result.dependValue;
//     const depOnObjVisible = getIn(state, `conditions.${formatCondName(depName)}.visible`);
//     if (depOnObjVisible) {
//       const conditionalObjValue = getElementValue(depName);

//       if (typeof depValue == 'function') {
//         isVisible = isVisible && depValue.call(null, conditionalObjValue, result);
//       } else {
//         isVisible = isVisible && depValue === conditionalObjValue;
//       }
//     } else {
//       isVisible = false;
//     }
 
// }

// let lastValues = null;


class FormHacker {

  constructor(state, action, next) {
    this.state = state;
    this.next = next;
    this.action = action;
  }

  workaround() {
    let action = this.action;
    switch(this.action.type) {      
      case REGISTER_PAGE_FIELD:
        //initial visible
        this.dispatchValidation();
        action = this.dispatchConditional();
        break;
      case actionTypes.BLUR: 
      case actionTypes.START_SUBMIT: 
        this.dispatchValidation();
        break;
    }
    return action;
  }

  dispatchValidation() {
    const pageEnv = this.state.getIn([ 'app', APP_CURRENT_PAGE ]);
    const pageVar = getPageVar(this.state, pageEnv.page);
    const reduxFormVar = getFormVar(this.state, pageEnv.form);

    if (pageVar && reduxFormVar) {
      const syncErrors = this.validate(pageVar, reduxFormVar);      
      const errors = syncErrors.isEmpty() ? false : syncErrors.toJS();
      this.next({ type: actionTypes.UPDATE_SYNC_ERRORS, meta: { form: pageEnv.form }, payload: { syncErrors: errors, error: false } });
    }
    return this.action;
  }

  validate(pageVar, reduxFormVar) {
    let result = Map({});
    const pageValidators = pageVar.getIn([ 'form' ]);
    pageValidators.forEach((v, k) => {
      if (v.validations) {
        const thisValues = reduxFormVar.getIn([ 'values' ]) || reduxFormVar.getIn([ 'initial' ]);
        const elementValue = thisValues.getIn( k.split('.') );
        Object.entries(v.validations).forEach(([ name, func ]) => { // eslint-disable-line
          const msg = func(elementValue, k, reduxFormVar, pageVar);
          // console.log(msg, elementValue, k);
          if (msg) {
            result = result.setIn(k.split('.'), msg);
            return msg;
          }
        });
      }
    });
    return result;
  }

  dispatchConditional() {
    const pageEnv = this.state.getIn([ 'app', APP_CURRENT_PAGE ]);
    const pageVar = getPageVar(this.state, pageEnv.page);
    const reduxFormVar = getFormVar(this.state, pageEnv.form);

    if (pageVar && reduxFormVar) {
      return this.registerConditional(pageVar, reduxFormVar);
    } else {
      return this.action;
    }
  }

  registerConditional(pageVar, reduxFormVar) {
    const name = this.action.field;
    const conditional = this.action.payload.conditionals;
    const getElementValue = (fieldName) => reduxFormVar.getIn([ 'values', ...fieldName.split('.') ]);
    const cachedValue = getElementValue(name);
    let isVisible = true;
    if (conditional && conditional.dependOn) {
      const depName = conditional.dependOn;
      const depValue = conditional.dependValue;
      const depOnObjVisible = pageVar.getIn([ 'form', depName ]);
      // console.log(name, 'depend on visible ', depName, depOnObjVisible.conditionals.visible);
      if (depOnObjVisible.conditionals.visible) {
        // console.log(name, 'depends on ', depName, ' depends value ', depValue, ' depends on visible ', depOnObjVisible.conditionals.visible);
        const conditionalObjValue = getElementValue(depName);
        // console.log('depend on value', depName, ' dep value', conditionalObjValue);
        if (typeof depValue == 'function') {
          isVisible = depValue.call(null, conditionalObjValue, reduxFormVar);
        } else {
          isVisible = depValue === true ? !!conditionalObjValue :
           ( depValue === false ? !conditionalObjValue : depValue === conditionalObjValue);
        }
        console.log('depend visible', isVisible);
      } else {
        isVisible = false;
      }
      this.action.payload.conditionals = Object.assign({}, conditional, { visible: isVisible, cachedValue: cachedValue });
    }

    return this.action;
  }

}

export default ({ getState }) => { // eslint-disable-line dispatch //
  return next => action => {
    const state = getState();
    let hacker = new FormHacker(state, action, next);
    let newAction = hacker.workaround();
    // console.log('hacker', newAction);

    // console.log('............. on form middleware ...............', getState().toJS(), 'state',  action, 'action');    
    return next(newAction);
  };
};
