import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';

import RootRouter from './routes';
import reducer from './redux/modules/reducer';
import Config from './configs/app';

import { createWidgetStore, registerWidgetPlugins } from 'a10-widget';
import { SchemaPlugin } from 'a10-widget-lib';
registerWidgetPlugins([ SchemaPlugin ]);

var oemConfig = require(`./oem/${Config.OEM}/Config`).default;

class Root extends Component {

  static childContextTypes = {
    appConfig: PropTypes.object,
    oemConfig: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.store = createWidgetStore('app', reducer);
  }

  getChildContext() {
    return {
      appConfig: Config,
      oemConfig: oemConfig,
      dispatch: this.store.dispatch
    };
  }

  render() {
    return (
      <Provider store={this.store} key="provider">
        <RootRouter />
      </Provider>
    );
  }

}

export default Root;
