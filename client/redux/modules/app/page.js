// page action
const REGISTER_PAGE_VAR = 'page/REGISTER_PAGE_VAR';
const REGISTER_PAGE_TITLE = 'page/REGISTER_PAGE_TITLE';
const REGISTER_PAGE_BREADCRUMB = 'page/REGISTER_PAGE_BREADCRUMB';

const DESTROY_PAGE = 'page/REGISTER_PAGE';

const pageReducers = {
  [ REGISTER_PAGE_VAR ](state, { page, node, payload }) {
    return state.setIn([ 'page', page, node ], payload);
  },
  [ REGISTER_PAGE_TITLE ](state, { page, title }) {
    return state.setIn([ 'page', page, 'title' ], title);
  },
  [ REGISTER_PAGE_BREADCRUMB ](state, { page, breadcrumb }) {
    return state.setIn([ 'page', page, 'breadcrumb' ], breadcrumb);
  },
  [ DESTROY_PAGE ](state, { page }) {
    let result = state.deleteIn([ 'page', page ]);
    return result.deleteIn([ 'axapi', page ]);
  }
};

export default pageReducers;

// ----------------------Action------------------
export const registerPageVar = (page, node, payload) => {
  return { type: REGISTER_PAGE_VAR, page, node, payload };
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
