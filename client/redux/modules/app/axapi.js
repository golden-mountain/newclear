import { Iterable, List, Map, fromJS } from 'immutable';

// axapi request import
import moment from 'moment';
import { get, isArray, uniqueId } from 'lodash';
// import * as logger from 'helpers/logger';

import { LAST_PAGE_KEY } from 'configs/appKeys';
import {
  AXAPI_REQUEST_SUCCESS, AXAPI_REQUEST_FAIL,
  AXAPI_REQUEST, AXAPI_CLEAR_LAST_ERROR
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

const getUid = () => uniqueId('AXAPI-ID-');

const apiReducers = {
  [ AXAPI_REQUEST ](state) {
    let result = state.setIn([ LAST_PAGE_KEY, 'axapi', 'isLoading' ], true);
    // result = result.setIn([ APP_CURRENT_PAGE,  'pages', page, pageId, componentName, componentId, 'data', 'isLoading' ], true);
    console.log('loading......................................');
    return result;
  },
  [ AXAPI_REQUEST_SUCCESS ](state, { resp, data, instancePath, notifiable }) {
    // console.log('notifiable::::::', notifiable);
    console.log('success  axapi request ......................................', resp);
    if (resp.length == 1) {
      let newResp = resp[0];
      let body = null;
      if (newResp.req.method === 'GET') {
        body = newResp.body;
      } else {
        body = newResp.body.response || newResp.body.authresponse || newResp.body;
      }

      pushAxapiReqs({ data, result: body });
      if (isAuthUrl(data)) {
        sessionStorage.setItem('token', body.signature);
      }

      const responseData = fromJS({
        error: newResp.error,
        statusCode: newResp.status,
        response: body
      });

      let result = state.setIn([ LAST_PAGE_KEY, 'axapi' ], responseData);
      result = result.setIn([ LAST_PAGE_KEY, 'axapiNeedNotify' ], notifiable);
      result = result.setIn([ LAST_PAGE_KEY, 'axapiUid' ], getUid());
      //return result.setIn([ page, 'axapi' ], responseData);
      result = result.setIn([ ...instancePath, 'data' ], body);
      return result;
    } else {
      console.log('More than one request', resp);
    }
  },
  [ AXAPI_REQUEST_FAIL ](state, { resp, data, instancePath, notifiable }) {
    // console.log('notifiable::::::', notifiable);
    console.log('failed  axapi request ......................................', resp);
    // let newResp = resp;
    let newResp = resp ? resp : { body: '' };

    pushAxapiReqs({ data, result: newResp.body });
    if (get(newResp, 'unauthorized', false) === true) {
      sessionStorage.removeItem('token');
    }

    let body = fromJS(newResp.body.response || newResp.body.authresponse);
    const responseData = fromJS({
      error: newResp.error,
      statusCode: newResp.status,
      response: body
    });

    let result = state.setIn([ LAST_PAGE_KEY, 'axapi' ], responseData);
    result = result.setIn([ LAST_PAGE_KEY, 'axapiNeedNotify' ], notifiable);
    result = result.setIn([ LAST_PAGE_KEY, 'axapiUid' ], getUid());
    result = result.setIn([ ...instancePath, 'data' ], body);
    return result;
  },
  [ AXAPI_CLEAR_LAST_ERROR ](state) {
    console.log('deleting last error.............');
    return state.deleteIn([ LAST_PAGE_KEY, 'axapi' ]);
  }
};

export default apiReducers;

// ----------------- AXAPI ------------------------
export function axapiRequest(instancePath, data, notifiable=false) {
  let { page, pageId, componentName, componentId } = instancePath;
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

  if (!componentName) {
    componentName = page;
  }

  if (!componentId) {
    componentId = pageId;
  }

  let request = {
    data:primaryData,
    instancePath,
    notifiable,
    types: [ AXAPI_REQUEST, AXAPI_REQUEST_SUCCESS, AXAPI_REQUEST_FAIL ],
    promises: promiseFuncs
  };

  // logger.group('before sending request', request);
  return request;
}


// export function clearAxapiLastError() {
//   console.log('clear last error');
//   return {
//     type: AXAPI_CLEAR_LAST_ERROR
//   };
// }
