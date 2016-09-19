// import { SubmissionError } from 'a10-redux-form';
import moment from 'moment';
import _ from 'lodash';
import Immutable from 'immutable';

const SAVE_SUCCESS = 'SAVE_SUCCESS';
const SAVE_FAIL = 'SAVE_FAIL';
const SAVE = 'SAVE';

const initialState = {};

const isAuthUrl = (data) => data.path.toLowerCase().indexOf('/axapi/v3/auth') > -1;

function pushAxapiReqs(item) {
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
}

export default function reducer(state = initialState, action = {}) {
  let body = {};
  switch (action.type) {
    case SAVE:
      return Immutable.Map({
        ...state,
        isLoading: true
      });

    case SAVE_SUCCESS:
      // console.log(action, state, '===========');
      body = JSON.parse(action.resp.text);
      pushAxapiReqs({ data: action.data, result: body });
      if (isAuthUrl(action.data)) {
        sessionStorage.setItem('token', body.authresponse.signature);
      }
      return Immutable.Map({
        ...state,
        error: action.resp.error,
        statusCode: action.resp.status,
        response: body
      });

    case SAVE_FAIL:
      // console.log(action, '===========');
      body = JSON.parse(action.resp.text);
      pushAxapiReqs({ data: action.data, result: body });
      if (_.get(action.resp, 'unauthorized', false) === true) {
        sessionStorage.removeItem('token');
      }

      return Immutable.Map({
        ...state,
        error: action.resp.error,
        statusCode: action.resp.status,
        response: body || {}
      });
    default:
      // console.log('default reducer');
      return Immutable.Map(state);
  }
}

export function request(data) {
  const authHeaders = {
    'content-type': 'application/json'
  };

  if (!isAuthUrl(data)) {
    authHeaders.Authorization = 'A10 ' + sessionStorage.getItem('token');
  }

  return {
    types: [ SAVE, SAVE_SUCCESS, SAVE_FAIL ],
    data: data,
    promise: (client) => client[data.method.toLowerCase()](data.path, {
      data: Immutable.Map(data.body),
      headers: Immutable.Map(authHeaders)
    })
  };
}
