import {
    REGISTER_PAGE_VAR, REGISTER_PAGE_TITLE ,
    REGISTER_PAGE_BREADCRUMB, REGISTER_CURRENT_PAGE, UPDATE_CURRENT_PAGE, DESTROY_PAGE,
    REGISTER_PAGE_VISIBLE
} from 'redux/modules/actionTypes';

import { APP_CURRENT_PAGE } from 'configs/appKeys';
import { fromJS, List } from 'immutable';

const pageReducers = {
  [ REGISTER_PAGE_VAR ](state, { pagePath, node, payload }) {
    return state.setIn([ ...pagePath, 'page', node ], payload);
  },
  [ REGISTER_PAGE_TITLE ](state, { pagePath, title }) {
    return state.setIn([ ...pagePath, 'page', 'title' ], title);
  },
  [ REGISTER_PAGE_BREADCRUMB ](state, { pagePath, breadcrumb }) {
    return state.setIn([ ...pagePath, 'page', 'breadcrumb' ], breadcrumb);
  },
  [ REGISTER_PAGE_VISIBLE ](state, { currentPage, visible, id='default' }) {
    let affectPage = currentPage;
    if (!affectPage) {
      affectPage = state.getIn([ APP_CURRENT_PAGE, 'envs' ]).last().getIn([ 'page' ]);
    }
    // console.log('set page visible at: ', [ APP_CURRENT_PAGE, 'pages', affectPage, id, 'visible' ]);
    return state.setIn([ affectPage, id, 'visible' ], visible);
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
  [ DESTROY_PAGE ](state, { pagePath }) {
    let result = state.getIn([ APP_CURRENT_PAGE, 'envs' ]);
    result = result.filterNot(x => x.getIn([ 'page' ]) == pagePath[0]);
    result = state.setIn([ APP_CURRENT_PAGE, 'envs' ], result);
    return result.deleteIn([ pagePath[0] ]);
  }
};

export default pageReducers;

// ----------------------Action------------------
export const registerPageVar = (pagePath, node, payload) => {
  return { type: REGISTER_PAGE_VAR, pagePath, node, payload };
};

export const registerCurrentPage = (pagePath, env) => {
  return { type: REGISTER_CURRENT_PAGE, pagePath, env };
};

export const updateCurrentPage = (pagePath, env) => {
  return { type: UPDATE_CURRENT_PAGE, pagePath, env };
};

export const setPageTitle = (pagePath, title) => {
  return { type: REGISTER_PAGE_TITLE, pagePath, title };
};

export const setPageBreadcrumb = (pagePath, breadcrumb) => {
  return { type: REGISTER_PAGE_BREADCRUMB, pagePath, breadcrumb };
};

export const setPageVisible = (pagePath, currentPage, visible, id='default') => {
  if (!currentPage) {
    currentPage = pagePath.page;
  }
  return { type: REGISTER_PAGE_VISIBLE, pagePath, currentPage, visible, id };
};

export const setLastPageVisible = (pagePath, visible, id='default') => {
  return { type: REGISTER_PAGE_VISIBLE, pagePath, visible, id };
};

export const destroyPage = (pagePath) => {
  return { type: DESTROY_PAGE, pagePath };
};
