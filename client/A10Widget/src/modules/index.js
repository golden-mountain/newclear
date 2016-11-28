
export actionTypes from './actionTypes';
import { Map } from 'immutable';
import apiReducers, { apiActions } from './api';
import widgetReducers, { widgetActions } from './widget';

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
export const actions = { ...apiActions, ...widgetActions };
