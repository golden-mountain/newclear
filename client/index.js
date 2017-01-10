import React from 'react';

import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
import Perf from 'react-addons-perf';
import Root from './root';

import { createDomElement } from 'helpers/dom';
import './index.ejs';

if (__DEV__) { // eslint-disable-line
  installDevTools(Immutable);

  window.Perf = Perf;
}

createDomElement(
  <Root />,
  'root'
);
