import { axapiRequest } from 'redux/modules/app/axapi';
import { APP_CURRENT_PAGE } from 'configs/appKeys';

export const getPayload = (path, method, body) => ({ path, method, body }); 
export const getInfo = (path, body) => getPayload(path, 'GET', body); 
export const putInfo = (path, body) => getPayload(path, 'PUT', body ); 
export const postInfo = (path, body) => getPayload(path, 'POST', body ); 
export const deleteInfo = (path, body) => getPayload(path, 'DELETE', body ); 


const _axapiRequest = (callback, path, body={}, page=APP_CURRENT_PAGE, dispatch=null) => {
  // console.log(callback, path, body, page);
  const requestInfo = callback(path, body);
  if (dispatch) {
    return dispatch(axapiRequest(page, requestInfo));
  } else {
    return axapiRequest(page, requestInfo);
  }  
};

export const axapiGet = (path, body, page=APP_CURRENT_PAGE, dispatch=null) =>  _axapiRequest(getInfo, path, body, page, dispatch);
export const axapiPost = (path, body, page=APP_CURRENT_PAGE, dispatch=null) =>  _axapiRequest(postInfo, path, body, page, dispatch);
export const axapiPut = (path, body, page=APP_CURRENT_PAGE, dispatch=null) =>  _axapiRequest(putInfo, path, body, page, dispatch);
export const axapiDelete = (path, body, page=APP_CURRENT_PAGE, dispatch=null) =>  _axapiRequest(deleteInfo, path, body, page, dispatch);
