
export actionTypes from './actionTypes';
import apiReducers, { apiActions } from './api';
import widgetReducers, { widgetActions } from './widget';

export const reducers = { ...apiReducers, ...widgetReducers };
export const actions = { ...apiActions, ...widgetActions };
