import { 
    REGISTER_PAGE_VAR, REGISTER_PAGE_TITLE , 
    REGISTER_PAGE_BREADCRUMB, REGISTER_CURRENT_PAGE,
    REGISTER_PAGE_VISIBLE
} from 'redux/modules/actionTypes';

const DESTROY_PAGE = 'page/REGISTER_PAGE';

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
  [ REGISTER_PAGE_VISIBLE ](state, { currentPage, visible }) {
    // debugger;
    // console.log(state.toJS());
    let affectPage = currentPage;
    if (!affectPage) {
      affectPage = state.getIn([ APP_CURRENT_PAGE, 'envs' ]).last().getIn([ 'page' ]);
      // console.log('last page::::::::', affectPage);
    }
    // console.log('register page visible, currentPage:', affectPage, 'visible:', visible);

    return state.setIn([ APP_CURRENT_PAGE, 'pages', affectPage, 'visible' ], visible);
  },
  [ REGISTER_CURRENT_PAGE ](state, { env }) {
    let result = state.getIn([ APP_CURRENT_PAGE, 'envs' ], List());
    result = result.push(fromJS(env));
    return state.setIn([ APP_CURRENT_PAGE, 'envs' ], result);
  },
  [ DESTROY_PAGE ](state, { page }) {
    let result = state.getIn([ APP_CURRENT_PAGE, 'envs' ]);
    result = result.pop();
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

export const setPageTitle = (page, title) => {
  return { type: REGISTER_PAGE_TITLE, page, title };
};

export const setPageBreadcrumb = (page, breadcrumb) => {
  return { type: REGISTER_PAGE_BREADCRUMB, page, breadcrumb };
};

export const setPageVisible = (page, currentPage, visible) => {
  return { type: REGISTER_PAGE_VISIBLE, page, currentPage, visible };
};

export const setLastPageVisible = (page, visible) => {
  return { type: REGISTER_PAGE_VISIBLE, page, visible };
};

export const destroyPage = (page) => {
  return { type: DESTROY_PAGE, page };
};
