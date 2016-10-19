import { 
  REGISTER_COMPONENT_VISIBLE, REGISTER_COMPONENT_DATA
} from 'redux/modules/actionTypes';
import { APP_CURRENT_PAGE } from 'configs/appKeys';
import { fromJS } from 'immutable';

const componentReducers = {
  [ REGISTER_COMPONENT_DATA ](state, { page, pageId, componentName, componentId, payload }) {
    let result = state.getIn([ APP_CURRENT_PAGE, 'pages', page, pageId, componentName, componentId ]);
    result = result.mergeDeep(fromJS(payload));
    return state.setIn([ APP_CURRENT_PAGE, 'pages', page, pageId, componentName, componentId ], result);
  },
  [ REGISTER_COMPONENT_VISIBLE ](state, { page, pageId, componentName, componentId, visible }) {
    return state.setIn([ APP_CURRENT_PAGE, 'pages', page, pageId, componentName, componentId, 'visible' ], visible);
  }
};

export default componentReducers;

export const setComponentVisible = (page, pageId, componentName, componentId, visible) => {
  return { type: REGISTER_COMPONENT_VISIBLE, page, pageId, componentName, componentId, visible };
};

export const setComponentState = (page, pageId, componentName, componentId, payload) => {
  return { type: REGISTER_COMPONENT_DATA, page, pageId, componentName, componentId, payload };
};
