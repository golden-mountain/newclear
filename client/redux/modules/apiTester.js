const SAVE_SUCCESS = 'SAVE_SUCCESS';
const SAVE_FAIL = 'SAVE_FAIL';
const SAVE = 'SAVE';

const initialState = {};

const isAuthUrl = (data) => data.path.toLowerCase().indexOf('/axapi/v3/auth') > -1;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE:
      return {
        ...state,
        isLoading: true
      };

    case SAVE_SUCCESS:
      if (isAuthUrl(action.data)) {
        localStorage.setItem('token', action.result.authresponse.signature);
      }
      return {
        ...state,
        response: action.result
      };

    case SAVE_FAIL:
      console.log('response action', action);
      // localStorage.removeItem('token');
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
  const authHeaders = {};

  if (!isAuthUrl(data)) {
    authHeaders.Authorization = 'A10 ' + localStorage.getItem('token');
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
