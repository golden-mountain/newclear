// import { bindActionCreators } from 'redux';
// import { mapValues } from 'lodash';

import { Iterable, Map } from 'immutable';
import { APP_CURRENT_PAGE, LAST_PAGE_KEY } from 'configs/appKeys';

// import widgetActions from 'redux/modules/app/widgetActions';


export const getAxapiResponse = (state, instancePath) => Iterable.isIterable(state) ? state.getIn([ 'app', ...instancePath, 'data' ]) : Map({});
export const getFormVar = (state, form) => Iterable.isIterable(state) ? state.getIn([ 'form', form ]) : Map({});
export const getPageVar = (state, instancePath) => {
  // console.log(instancePath, '............... state helper');
  if (!instancePath) {
    return Map();
  }
  return Iterable.isIterable(state) ? state.getIn([ 'app', ...instancePath ]) : Map({});
};

export const getAppEnvVar = (state, immutable=false) => {
  const envs = state.getIn([ 'app', APP_CURRENT_PAGE, 'envs' ]);

  if (envs) {
    try {
      return immutable
      ? envs.last()
      : envs.last().toJS();
    } catch( e ) {
      console.log(envs);
      return {};
    }
  } else {
    return {};
  }
};

export const getAppPageVar = (state, instancePath=[], keys='') => {
  // let { page, pageId } = instancePath;
  let path = [];
  const appState = state.getIn([ 'app' ], false);
  if (appState) {
    path = [ 'app' ];
  }

  path = path.concat(instancePath);

  if (keys && typeof keys == 'string') {
    keys = [ keys ];
  }

  if (keys) {
    path= path.concat(keys);
  }

  return state.getIn(path);
};


export const getComponentVar = (state, instancePath, key) => {
  return state.getIn([ ...instancePath, key ], null);
};

// each form submit we will store data to a store accessed by current global page
export const getAppValueStore = (state, form='') => {
  const appState = state.getIn([ 'app' ], false);
  let path = [];
  if (appState) {
    path = [ 'app', APP_CURRENT_PAGE, 'store' ];
  } else {
    path = [ APP_CURRENT_PAGE, 'store' ];
  }

  if (form) {
    path.push(form);
  }

  let apiData = state.getIn(path);
  let result = [];
  if (apiData) {
    apiData.forEach((data) => { // for form level
      data.forEach((req) => { //
        result.push(req);
      });
    });
  }

  return result;
};

export const getAxapiUid = (state) => {
  return state.getIn([ 'app', LAST_PAGE_KEY, 'axapiUid' ]);
};
