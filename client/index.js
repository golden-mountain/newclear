import React from 'react';
import { Provider } from 'react-redux';

import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
import Perf from 'react-addons-perf';

import RootRouter from './routes';
import reducer from './redux/modules/reducer';
import { createDomElement } from 'helpers/dom';

import { createWidgetStore } from 'A10Widget';

// Immutable js
import './index.ejs';

// if not import here, found we can't dispatch things
// maybe things will bound twice
import appActions from './redux/modules/app/index';
window.appActions = appActions;

// removed logger() because it's nonesense
// let middlewares = [ thunk,  createMiddleware(client) ];

//webpack define plugin defined env
if (__DEV__) { // eslint-disable-line
  // logger middleware
  // const transformer = (state) => {
  //   if (Iterable.isIterable(state)) return state.toJS();
  //   else return state;
  // };
  // const logger = createLogger({
  //   stateTransformer: transformer,
  //   actionTransformer: transformer,
  //   collapsed: true,
  //   diff: true,
  //   duration : true
  // });

  // middlewares.push(logger);

  installDevTools(Immutable);

  window.Perf = Perf;
}

const store = createWidgetStore('app', reducer);

createDomElement(
  <Provider store={store} key="provider">
    <RootRouter />
  </Provider>,
  'root'
);
