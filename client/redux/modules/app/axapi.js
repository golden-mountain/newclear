import { Map, fromJS } from 'immutable';
import { Iterable } from 'immutable';

// axapi request import
import moment from 'moment';
import _ from 'lodash';
import * as logger from 'helpers/logger';

// api action
const AXAPI_SAVE_SUCCESS = 'page/api/AXAPI_SAVE_SUCCESS';
const AXAPI_SAVE_FAIL = 'page/api/AXAPI_SAVE_FAIL';
const AXAPI_SAVE = 'page/api/AXAPI_SAVE';
const AXAPI_CLEAR_LAST_ERROR = 'page/api/AXAPI_CLEAR_LAST_ERROR';

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

const lastPage = '__last__';

const apiReducers = {
  [ AXAPI_SAVE ](state, { page }) {
    let result = state.setIn([ 'axapi', lastPage, 'isLoading' ], true);
    result = result.setIn([ 'axapi', page , 'isLoading' ], true);
    console.log('loading......................................');
    return result;
  },
  [ AXAPI_SAVE_SUCCESS ](state, { resp, data, page }) {
    // console.log('success  axapi request ......................................');

    const body = JSON.parse(resp.text);
    pushAxapiReqs({ data, result: body });
    if (isAuthUrl(data)) {
      sessionStorage.setItem('token', body.authresponse.signature);
    }    

    const responseData = fromJS({
      error: resp.error,
      statusCode: resp.status,
      response: fromJS(body.response || body.authresponse)
    });

    let result = state.setIn([ 'axapi', lastPage ], responseData);
    return result.setIn([ 'axapi', page ], responseData);
  },
  [ AXAPI_SAVE_FAIL ](state, { resp, data, page }) {
    const body = JSON.parse(resp.text);
    pushAxapiReqs({ data, result: body });
    if (_.get(resp, 'unauthorized', false) === true) {
      sessionStorage.removeItem('token');
    }

    const responseData = fromJS({
      error: resp.error,
      statusCode: resp.status,
      response: fromJS(body.response || body.authresponse)
    });
    
    let result = state.setIn([ 'axapi', lastPage ], responseData);
    return result.setIn([ 'axapi', page ], responseData);
  },
  [ AXAPI_CLEAR_LAST_ERROR ](state) {
    console.log('deleting last error.............');
    return state.deleteIn([ 'axapi', lastPage ]);    
  }
};

export default apiReducers;

// ----------------- AXAPI ------------------------
export function axapiRequest(page, data) {
  const authHeaders = {
    'content-type': 'application/json'
  };

  if (Iterable.isIterable(data)) {
    data = data.toJS();
  }

  if (!isAuthUrl(data)) {
    authHeaders.Authorization = 'A10 ' + sessionStorage.getItem('token');
  }

  let request = {
    data, 
    page, 
    types: [ AXAPI_SAVE, AXAPI_SAVE_SUCCESS, AXAPI_SAVE_FAIL ],    
    promise: (client) => client[data.method.toLowerCase()](data.path, {
      data: Map(data.body),
      headers: Map(authHeaders)
    })
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
