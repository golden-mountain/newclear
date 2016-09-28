import { Iterable, Map } from 'immutable';

export const getAxapiResponse = (state, page) => Iterable.isIterable(state) ? state.getIn([ 'app', page, 'axapi' ]) : Map({});
export const getFormVar = (state, form) => Iterable.isIterable(state) ? state.getIn([ 'form', form ]) : Map({});
export const getPageVar = (state, page) => {
  return Iterable.isIterable(state) ? state.getIn([ 'app', page ]) : Map({});
};
