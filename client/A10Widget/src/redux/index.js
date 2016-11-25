
export actionTypes from './actionTypes';
import apiReducers, { apiActions } from './api';
import widgetReducers, { widgetActions } from './widget';
import { Map } from 'immutable';

const empty = Map({});
let behaviors = { ...apiReducers, ...widgetReducers };
const createReducer = () => {
  const reducer = (state = empty, action) => {
    const behavior = behaviors[ action.type ];
    return behavior ? behavior(state, action) : state;
  };

  return reducer;
};

export const reducer = createReducer();
export const actions = { ...apiActions, ...widgetActions };
