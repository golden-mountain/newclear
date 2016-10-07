import { Iterable, Map } from 'immutable';
import { APP_CURRENT_PAGE } from 'configs/appKeys';

export const getAxapiResponse = (state, page) => Iterable.isIterable(state) ? state.getIn([ 'app', page, 'axapi' ]) : Map({});
export const getFormVar = (state, form) => Iterable.isIterable(state) ? state.getIn([ 'form', form ]) : Map({});
export const getPageVar = (state, page) => {
  return Iterable.isIterable(state) ? state.getIn([ 'app', page ]) : Map({});
};

export const getAppEnvVar = (state, immutable=false) => {
  return immutable 
  ? state.getIn([ 'app', APP_CURRENT_PAGE, 'envs' ]).last() 
  : state.getIn([ 'app', APP_CURRENT_PAGE, 'envs' ]).last().toJS();
};

export const getAppPageVar = (state, key='', pageName='') => {
  let path = [];
  const appState = state.getIn([ 'app' ], false);
  if (appState) {
    path = [ 'app', APP_CURRENT_PAGE, 'pages' ];  
  } else {
    path = [ APP_CURRENT_PAGE, 'pages' ];
  }
  
  let page = pageName;
  if (!page) {
    let env = getAppEnvVar(state);
    path.push(env.page);
  } else {
    path.push(page);
  }

  if (key) {
    path.push(key);
  }

  // console.log('path:::::::::', path, state, state.getIn([ "app", "__app_current_page__", "pages" ] ));
  return state.getIn(path);
};

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
        // reqs.forEach((req) => {
        result.push(req);
        // });
      });
    });
  }

  return result;
};
