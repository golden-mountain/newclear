import { actionTypes } from 'redux-form/immutable'; 

export default ({ getState }) => { // eslint-disable-line dispatch //
  return next => action => {
    const state = getState().getIn([ 'app', 'virtualServer', 'form', 'vrid' ]);
    if (state) {
      const syncErrors = {
        'virtual-server': {
          'ip-address': 'no ip'
        }
      };
      next({ type: actionTypes.UPDATE_SYNC_ERRORS, meta: { form: 'virtualServerForm' }, payload: { syncErrors, error: {} } });
    }
    
    console.log(getState().toJS(), 'state',  action, 'action');
    return next(action);
  };
};
