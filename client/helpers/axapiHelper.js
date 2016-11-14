// import { axapiRequest } from 'redux/modules/app/axapi';
// import { APP_CURRENT_PAGE } from 'configs/appKeys';

export const getPayload = (path, method, body) => {
  if (method.toLowerCase() == 'get') {
    if (typeof body === 'object') {
      let query = Object.entries(body).map(([ key, value ]) => {
        return `${key}=${value}`;
      });
      path += '?' + query.join('&');
    }
  }
  return { path, method, body };
};
export const getInfo = (path, body) => getPayload(path, 'GET', body);
export const putInfo = (path, body) => getPayload(path, 'PUT', body );
export const postInfo = (path, body) => getPayload(path, 'POST', body );
export const deleteInfo = (path, body) => getPayload(path, 'DELETE', body );

export const getResponseBody =(resp) => {
  let body = null;
  try {
    if (resp.req.method === 'GET') {
      body = resp.body;
    } else {
      body = resp.body.response || resp.body.authresponse || resp.body || {};
    }
  } catch(e) {
    console.log(e.message);
  }
  return body;
};
