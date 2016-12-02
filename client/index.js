import React from 'react';
import { Provider } from 'react-redux';

import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
import Perf from 'react-addons-perf';

import RootRouter from './routes';
import reducer from './redux/modules/reducer';
import { createDomElement } from 'helpers/dom';

import { createWidgetStore, registerWidgetPlugins } from 'a10-widget';

import { SchemaPlugin } from 'a10-widget-lib';
registerWidgetPlugins([ SchemaPlugin ]);
import './index.ejs';

if (__DEV__) { // eslint-disable-line
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
