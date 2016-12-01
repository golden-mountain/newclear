
export actionTypes from './actionTypes';
import { Map } from 'immutable';
import apiReducers, * as apiActions from './api';
import widgetReducers, * as widgetActions  from './widget';

// const behaviors = ;
const createReducer = (behaviors) => {
  const empty = Map({});
  const reducer = (state = empty, action) => {
    const behavior = behaviors[ action.type ];
    return behavior ? behavior(state, action) : state;
  };

  return reducer;
};

export const reducer = createReducer({ ...apiReducers, ...widgetReducers });
// const { default, ...apiActions } = apiModule; // eslint-disable-line
// const { default, ...widgetActions } = widgetModule; // eslint-disable-line
delete apiActions.default;
delete widgetActions.default;
export const actions = { ...apiActions, ...widgetActions };
