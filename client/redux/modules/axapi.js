import { SubmissionError } from 'redux-form';
import moment from 'moment';

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
  }
  latestItems.push(hisAction);
  let itemStr = JSON.stringify(latestItems);
  localStorage.setItem('axapi', itemStr);
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE:
      return {
        ...state,
        isLoading: true
      };

    case SAVE_SUCCESS:
      pushAxapiReqs(action);
      if (isAuthUrl(action.data)) {
        sessionStorage.setItem('token', action.result.authresponse.signature);
      }
      return {
        ...state,
        response: action.result
      };

    case SAVE_FAIL:
      pushAxapiReqs(action);
      return {
        ...state,
        error: true,
        response: action.error ? action.error : initialState
      };
    default:
      // console.log('default reducer');
      return state;
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
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    data: data,
    promise: (client) => client[data.method.toLowerCase()](data.path, {
      data: data.body,
      headers: authHeaders
    })
  };
}
