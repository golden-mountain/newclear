import { actionTypes } from 'redux-form/immutable';
import { Map, Iterable } from 'immutable';
import { toPath } from 'lodash';
import { getFormVar, getPageVar, getAppEnvVar } from 'helpers/stateHelper';
// import { APP_CURRENT_PAGE } from 'configs/appKeys';

import { REGISTER_PAGE_FIELD, SYNC_PAGE_FIELD } from 'redux/modules/actionTypes'; //CHANGE

const empty = Map({});

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
        this.dispatchValidation(true);
        action = this.reinitialConditional();
        break;
      case actionTypes.CHANGE:
        this.changeConditional(false);
        break;
      case actionTypes.BLUR:
      case actionTypes.START_SUBMIT: //eslint-disable-line
        this.dispatchValidation();
        break;
    }
    return action;
  }

  _getVarsByEnv() {
    const pageEnv = getAppEnvVar(this.state);
    const pageVar = getPageVar(this.state, [ pageEnv.page, pageEnv.pageId ] );
    const reduxFormVar = getFormVar(this.state, pageEnv.form);

    return { pageEnv, pageVar, reduxFormVar };
  }

  dispatchValidation(register=false) {
    const { pageEnv, pageVar, reduxFormVar } = this._getVarsByEnv();

    if (pageVar && reduxFormVar) {
      const syncErrors = this.validate(pageVar, reduxFormVar);
      const errors = syncErrors.isEmpty() ? false : syncErrors.toJS();
      // console.log('new errors:', errors);
      if (register) {
        if (!syncErrors.isEmpty()) {
          this.next({ type: actionTypes.UPDATE_SYNC_ERRORS, meta: { form: pageEnv.form }, payload: { syncErrors: errors, error: false } });
        }
      } else {
        this.next({ type: actionTypes.UPDATE_SYNC_ERRORS, meta: { form: pageEnv.form }, payload: { syncErrors: errors, error: false } });
      }
    }
    return this.action;
  }

  validate(pageVar, reduxFormVar) {
    let result = Map({});
    const pageValidators = pageVar.getIn([ 'form' ], Map());
    // console.log(pageValidators.toJS(), '=======================pageValidators');

    pageValidators.forEach((field, name) => {
      if (Iterable.isIterable(field)) {
        const validations = field.getIn([ 'validations' ], empty);
        if (validations && Iterable.isIterable(validations)) {
          const thisValues = reduxFormVar.getIn([ 'values' ]) || reduxFormVar.getIn([ 'initial' ]);
          const elementValue = thisValues.getIn( toPath(name) );
          // console.log('validations is Iterable..............', validations, Iterable.isIterable(validations));
          validations.forEach((func, k) => { // eslint-disable-line
            let msg = '';
            if (elementValue !== undefined && k !== 'required') {
              msg = func(elementValue, name, reduxFormVar, pageVar);
            }

            // console.log('msg', msg, 'for element:', name, 'element value is:', elementValue);
            if (msg) {
              result = result.setIn(toPath(name), msg);
              return msg;
            }
          });
        }
      }
    });
    return result;
  }

  _isElementVisible(depValue, conditionalObjValue) {
    return depValue === true ? !!conditionalObjValue :
             ( depValue === false ? !conditionalObjValue : depValue == conditionalObjValue);
  }

  reinitialConditional() {
    const { pageVar, reduxFormVar } = this._getVarsByEnv();
    if (pageVar && reduxFormVar) {
      const name = this.action.field;
      let conditional = this.action.payload.getIn([ 'conditionals' ]);
      const getElementValue = (fieldName) => reduxFormVar.getIn([ 'values', ...fieldName.split('.') ]);
      const cachedValue = getElementValue(name);
      let isVisible = true;
      if (Iterable.isIterable(conditional)) {
        const depName = conditional.getIn([ 'dependOn' ], '');
        const depValue = conditional.getIn([ 'dependValue' ], null);
        const depOnObjVisible = pageVar.getIn([ 'form', depName, 'conditionals', 'visible' ], true);

        if (depOnObjVisible && depName) {
          const conditionalObjValue = getElementValue(depName);

          if (typeof depValue == 'function') {
            isVisible = depValue.call(null, conditionalObjValue, reduxFormVar);
          } else {
            isVisible = this._isElementVisible(depValue, conditionalObjValue);
          }
        } else if (depName) {
          isVisible = false;
        }

        // const cond = Map({ visible: isVisible, cachedValue: cachedValue, dependOn: depName, dependValue: depValue };
        conditional = conditional.setIn([ 'visible' ], isVisible);
        conditional = conditional.setIn([ 'cachedValue' ], cachedValue);
        // console.log('conditional', conditional);
        this.action.payload = this.action.payload.setIn([ 'conditionals' ], conditional);
      }
    }
    // console.log('reinitial conditional:', this.action);
    return this.action;
  }

  changeConditional() {
    const { pageEnv, pageVar, reduxFormVar } = this._getVarsByEnv();
    const fields = pageVar.getIn([ 'form' ]);
    let storedBackFields = Map({});

    const setVisible = (elements, parentFieldName, parentIsVisible, conditionalObjValue) => {
      elements.forEach((element, elementName) => {
        if (Iterable.isIterable(element)) {
          let result = element;
          const depOn = element.getIn([ 'conditionals', 'dependOn' ]);
          const depValue = element.getIn([ 'conditionals', 'dependValue' ]);

          // only find those field name depend on current changing field name
          if (depOn === parentFieldName) {
            let isNewVisible = parentIsVisible;
            if (typeof depValue == 'function') {
              isNewVisible = isNewVisible && depValue.call(null, conditionalObjValue, reduxFormVar);
            } else {
              isNewVisible = isNewVisible && this._isElementVisible(depValue, conditionalObjValue);
            }

            // for debugging
            // console.log(elementName, 'depOn:', depOn, 'depValue:', depValue, 'conditionalObjValue:', conditionalObjValue, 'parentIsVisible:', parentIsVisible, 'isNewVisible:', isNewVisible);

            result = result.deleteIn([ 'validations' ]);
            result = result.setIn([ 'conditionals', 'visible'  ], isNewVisible);
            storedBackFields = storedBackFields.setIn([ elementName ], result);
            let newConditionalObjValue = reduxFormVar.getIn([ 'values', ...elementName.split('.') ]);
            setVisible(elements, elementName, isNewVisible, newConditionalObjValue);
            return true;
          }
        }
      });
    };

    setVisible(fields, this.action.meta.field, fields.getIn([ this.action.meta.field, 'conditionals', 'visible' ]), this.action.payload);

    // console.log('storedBackFields...................', storedBackFields);
    this.next({ type: SYNC_PAGE_FIELD, page: pageEnv.page, payload: storedBackFields });
  }

}

export default ({ getState }) => { // eslint-disable-line dispatch //
  return next => action => {
    const state = getState();
    let hacker = new FormHacker(state, action, next);
    let newAction = hacker.workaround();
    // console.log('hacker', newAction, next);

    // console.log('............. on form middleware ...............', getState().toJS(), 'state',  action, 'action');
    return next(newAction);
  };
};
