import { 
    REGISTER_PAGE_VAR, REGISTER_PAGE_TITLE , 
    REGISTER_PAGE_BREADCRUMB, REGISTER_CURRENT_PAGE
} from 'redux/modules/actionTypes';

const DESTROY_PAGE = 'page/REGISTER_PAGE';

import { APP_CURRENT_PAGE } from 'configs/appKeys';

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
  [ REGISTER_CURRENT_PAGE ](state, { env }) {
    return state.setIn([ APP_CURRENT_PAGE ], env);
  },
  [ DESTROY_PAGE ](state, { page }) {
    // let result = state.deleteIn([ page, 'page' ]);
    // result = state.deleteIn([ page ]);
    return state.deleteIn([ page ]);
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

export const destroyPage = (page) => {
  return { type: DESTROY_PAGE, page };
};
