import { axapiRequest } from 'redux/modules/app/axapi';
import { APP_CURRENT_PAGE } from 'configs/appKeys';

export const getPayload = (path, method, body) => ({ path, method, body }); 
export const getInfo = (path, body) => getPayload(path, 'GET', body); 
export const putInfo = (path, body) => getPayload(path, 'PUT', body ); 
export const postInfo = (path, body) => getPayload(path, 'POST', body ); 
export const deleteInfo = (path, body) => getPayload(path, 'DELETE', body ); 


const _axapiRequest = (callback, path, body={}, info, dispatch=null) => {
  const { page , pageId='default', componentName='', componentId='', notifiable=false } = info;
  const requestInfo = callback(path, body);
  const action = axapiRequest(page, requestInfo, pageId, componentName, componentId, notifiable);
  if (dispatch) {
    return dispatch(action);
  } else {
    return action;
  }  
};

export const axapiGet = (path, body, info={ page: APP_CURRENT_PAGE } , dispatch=null) =>  _axapiRequest(getInfo, path, body, info, dispatch);
export const axapiPost = (path, body, info={ page: APP_CURRENT_PAGE } , dispatch=null) =>  _axapiRequest(postInfo, path, body, info, dispatch);
export const axapiPut = (path, body, info={ page: APP_CURRENT_PAGE } , dispatch=null) =>  _axapiRequest(putInfo, path, body, info, dispatch);
export const axapiDelete = (path, body, info={ page: APP_CURRENT_PAGE }, dispatch=null) =>  _axapiRequest(deleteInfo, path, body, info, dispatch);
