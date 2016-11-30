export const buildInstancePath = (pageName, pageId, componentName, componentId) => {
  if (!componentName) {
    return [ pageName, pageId ];
  } else {
    return [ pageName, pageId, componentName, componentId ];
  }
};

// import { axapiRequest } from 'redux/modules/app/axapi';
// import { APP_CURRENT_PAGE } from 'configs/appKeys';
const COMPONENT_PAGE_SIZE = 25;

export const getPayload = (path, method, body, name='') => {
  if (method.toLowerCase() == 'get') {
    if (typeof body === 'object') {
      let query = Object.entries(body).map(([ key, value ]) => {
        return `${key}=${value}`;
      });
      if (query.length) {
        path += '?' + query.join('&');
      }
    }
  }
  return { path, method, body, name };
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


export  const getPaginationParam = (start=0, size=COMPONENT_PAGE_SIZE) => {
  return {
    start,
    count: size
  };
};

export const getStartPage = (location) => {
  const pageId = parseInt(location.search.replace(/.*?page=(\d+)/, '$1')) || 0;
  return pageId ? pageId > 0 ? pageId-1 : pageId  : 0;
};

export const getNextPageURL = (location, newPage=0) => {
  let page = newPage;
  if (!page) {
    page = getStartPage(location) + 1;
  }

  let pageStr = `page=${page}`;
  let query = location.search;
  if (query) {
    query = query.replace(/page=\d+/, pageStr);
  } else {
    query = `?${pageStr}`;
  }

  let path = location.pathname.replace(/\/$/, '');
  return `${path}/${query}`;
};
