import { 
    REGISTER_PAGE_VAR, REGISTER_PAGE_TITLE , 
    REGISTER_PAGE_BREADCRUMB, REGISTER_CURRENT_PAGE, UPDATE_CURRENT_PAGE, DESTROY_PAGE, 
    REGISTER_PAGE_VISIBLE
} from 'redux/modules/actionTypes';

import { APP_CURRENT_PAGE } from 'configs/appKeys';
import { fromJS, List } from 'immutable';

const pageReducers = {
  [ REGISTER_PAGE_VAR ](state, { page, node, payload }) {
    return state.setIn([ page, 'page', node ], payload);
  },
  [ REGISTER_PAGE_TITLE ](state, { page, title }) {
    return state.setIn([ page, 'page', 'title' ], title);
  },
  [ REGISTER_PAGE_BREADCRUMB ](state, { page, breadcrumb }) {
    return state.setIn([ page, 'page', 'breadcrumb' ], breadcrumb);
  },
  [ REGISTER_PAGE_VISIBLE ](state, { currentPage, visible, id='default' }) {
    let affectPage = currentPage;
    if (!affectPage) {
      affectPage = state.getIn([ APP_CURRENT_PAGE, 'envs' ]).last().getIn([ 'page' ]);
    }
    // console.log('set page visible at: ', [ APP_CURRENT_PAGE, 'pages', affectPage, id, 'visible' ]);
    return state.setIn([ APP_CURRENT_PAGE, 'pages', affectPage, id, 'visible' ], visible);
  },
  [ REGISTER_CURRENT_PAGE ](state, { env }) {
    let result = state.getIn([ APP_CURRENT_PAGE, 'envs' ], List());
    result = result.push(fromJS(env));
    return state.setIn([ APP_CURRENT_PAGE, 'envs' ], result);
  },
  [ UPDATE_CURRENT_PAGE ](state, { env }) {
    // console.log('===>', env);
    let result = state.getIn([ APP_CURRENT_PAGE, 'envs' ], List());
    let last = result.last().mergeDeep(env);
    result = result.pop();
    result = result.push(last);
    return state.setIn([ APP_CURRENT_PAGE, 'envs' ], result);
  },
  [ DESTROY_PAGE ](state, { page }) {
    let result = state.getIn([ APP_CURRENT_PAGE, 'envs' ]);
    result = result.filterNot(x => x.getIn([ 'page' ]) == page);
    result = state.setIn([ APP_CURRENT_PAGE, 'envs' ], result);
    return result.deleteIn([ page ]);
  }
};

export default pageReducers;

// ----------------------Action------------------
export const registerPageVar = (page, node, payload) => {
  return { type: REGISTER_PAGE_VAR, page, node, payload };
};

export const registerCurrentPage = (page, env) => {
  return { type: REGISTER_CURRENT_PAGE, page, env };
};

export const updateCurrentPage = (page, env) => {
  return { type: UPDATE_CURRENT_PAGE, page, env };
};

export const setPageTitle = (page, title) => {
  return { type: REGISTER_PAGE_TITLE, page, title };
};

export const setPageBreadcrumb = (page, breadcrumb) => {
  return { type: REGISTER_PAGE_BREADCRUMB, page, breadcrumb };
};

export const setPageVisible = (page, currentPage, visible, id='default') => {
  if (!currentPage) {
    currentPage = page;
  }
  return { type: REGISTER_PAGE_VISIBLE, page, currentPage, visible, id };
};

export const setLastPageVisible = (page, visible, id='default') => {
  return { type: REGISTER_PAGE_VISIBLE, page, visible, id };
};

export const destroyPage = (page) => {
  return { type: DESTROY_PAGE, page };
};
