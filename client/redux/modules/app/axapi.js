import { Iterable, List, Map, fromJS } from 'immutable';

// axapi request import
import moment from 'moment';
import { get, isArray } from 'lodash';
import * as logger from 'helpers/logger';

import { LAST_PAGE_KEY } from 'configs/appKeys';
import { 
  AXAPI_SAVE_SUCCESS, AXAPI_SAVE_FAIL, 
  AXAPI_SAVE, AXAPI_CLEAR_LAST_ERROR 
} from 'redux/modules/actionTypes';

const isAuthUrl = (data) => data.path.toLowerCase().indexOf('/axapi/v3/auth') > -1;

const pushAxapiReqs = (item) => {
  let latestItems = localStorage.getItem('axapi');
  if (!latestItems) {
    latestItems = [];
  } else {
    latestItems = JSON.parse(latestItems);
    localStorage.removeItem('axapi');
  }
  if (latestItems.length >= 20) {
    latestItems.shift();
  }

  let hisAction = {
    at: moment().format('YYYY-MM-DD HH:mm:ss'),
    body: item
  };
  latestItems.push(hisAction);
  let itemStr = JSON.stringify(latestItems);
  localStorage.setItem('axapi', itemStr);
};

const apiReducers = {
  [ AXAPI_SAVE ](state, { page }) {
    let result = state.setIn([ LAST_PAGE_KEY, 'axapi', 'isLoading' ], true);
    result = result.setIn([ page, 'axapi', 'isLoading' ], true);
    // console.log('loading......................................');
    return result;
  },
  [ AXAPI_SAVE_SUCCESS ](state, { resp, data, page, notifiable }) {
    // console.log('notifiable::::::', notifiable);
    console.log('success  axapi request ......................................', resp);
    if (resp.length == 1) {
      let newResp = resp[0];
      let body = null;
      if (newResp.req.method === 'GET') {
        body = newResp.body;
      } else {
        body = newResp.body.response || newResp.body.authresponse;
      }

      pushAxapiReqs({ data, result: body });
      if (isAuthUrl(data)) {
        sessionStorage.setItem('token', body.signature);
      }    

      const responseData = fromJS({
        error: newResp.error,
        statusCode: newResp.status,
        response: fromJS(body)
      });

      let result = state.setIn([ LAST_PAGE_KEY, 'axapi' ], responseData);
      result = result.setIn([ LAST_PAGE_KEY, 'axapiNeedNotify' ], notifiable);
      return result.setIn([ page, 'axapi' ], responseData);
    } else {
      console.log('More than one request', resp);
    }
  },
  [ AXAPI_SAVE_FAIL ](state, { resp, data, page, notifiable }) {
    // console.log('notifiable::::::', notifiable);
    console.log('failed  axapi request ......................................', resp);
    let newResp = resp;
    newResp = newResp ? newResp : {};
    let body = newResp.text;
    try {
      body = newResp.text ? JSON.parse(newResp.text) : {};
    } catch(e) {
      console.log(e);
    }
    pushAxapiReqs({ data, result: body });
    if (get(newResp, 'unauthorized', false) === true) {
      sessionStorage.removeItem('token');
    }

    const responseData = fromJS({
      error: newResp.error,
      statusCode: newResp.status,
      response: fromJS(body.response || body.authresponse)
    });
    
    let result = state.setIn([ LAST_PAGE_KEY, 'axapi' ], responseData);
    result = result.setIn([ LAST_PAGE_KEY, 'axapiNeedNotify' ], notifiable);
    return result.setIn([ page, 'axapi' ], responseData);
  },
  [ AXAPI_CLEAR_LAST_ERROR ](state) {
    console.log('deleting last error.............');
    return state.deleteIn([ LAST_PAGE_KEY, 'axapi' ]);    
  }
};

export default apiReducers;

// ----------------- AXAPI ------------------------
export function axapiRequest(page, data, notifiable=false) {
  const authHeaders = {
    'content-type': 'application/json'
  };

  let primaryData = {}, jsData = data;
  if (Iterable.isIterable(data)) {
    jsData = data.toJS();    
  }

  if (isArray(jsData)) {
    primaryData = jsData[0];
  } else {
    primaryData = jsData;
  }

  if (!isAuthUrl(primaryData)) {
    authHeaders.Authorization = 'A10 ' + sessionStorage.getItem('token');
  }

  let list = List();
  if (!isArray(jsData)) {
    list = list.push(jsData);
  } else {
    list = data;
  }

  const promiseFuncs = (client) => {
    let promises = [];
    list.forEach((element) => {
      promises.push(client[element.method.toLowerCase()](element.path, {
        data: Map(element.body),
        headers: Map(authHeaders)
      }));
    });
    return promises;
  };


  let request = {
    data:primaryData, 
    page,
    notifiable,
    types: [ AXAPI_SAVE, AXAPI_SAVE_SUCCESS, AXAPI_SAVE_FAIL ],    
    promises: promiseFuncs
  };

  logger.group('before sending request', request);
  return request;
}


export function clearAxapiLastError() {
  console.log('clear last error');
  return {
    type: AXAPI_CLEAR_LAST_ERROR
  };  
}
