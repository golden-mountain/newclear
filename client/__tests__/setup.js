import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
// import TestUtils from 'react-addons-test-utils';
import { mount } from 'enzyme';
// import chai from 'chai';
// import chaiEnzyme from 'chai-enzyme';
// chai.use(chaiEnzyme());

import ApiClient from 'helpers/ApiClient';
import createMiddleware from '../redux/middleware/clientMiddleware';
import reducer from '../redux/modules/reducer';

import appActions from '../redux/modules/app/index';

import CoreManager from 'helpers/CoreManager';
const EmptyLayout = require('oem/thunder/EmptyLayout').default;

//JS dom setup for globally
if (!global.document) {
  try {
    const jsdom = require('jsdom').jsdom; // could throw

    global.document = jsdom('<!doctype html><html><body></body></html>');
    global.window = document.defaultView;
    global.window.appActions = appActions;
    Object.keys(document.defaultView).forEach((property) => {
      if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
      }
    });

    global.navigator = {
      userAgent: 'node.js'
    };
  } catch (e) {
    // jsdom is not supported...
    if (e.message === "Cannot find module 'jsdom'") {
      console.error('[enzyme/withDom] Error: missing required module "jsdom"');
      console.error('[enzyme/withDom] To fix this you must run:');
      console.error('[enzyme/withDom]   npm install jsdom --save-dev');
    } else {
      console.error('[enzyme withDom] ' + (e.stack || e.message));
    }
  }
}


export const createWidget = (Widget, extraProps={}) => {
  const client = new ApiClient();
  let middlewares = [ thunk,  createMiddleware(client) ];
  const composeEnhancers = compose;

  const initialState = Immutable.Map();
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  const Layout = EmptyLayout;
  const LayoutWrapper = CoreManager({
    page: 'test',
    pageId: 'default'
  })(Layout, Widget, extraProps);

  return mount(
    <Provider store={store} key="provider">
      <LayoutWrapper />
    </Provider>
  );

};

