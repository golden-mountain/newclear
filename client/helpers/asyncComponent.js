import React, { Component } from 'react';
import CoreManager from 'helpers/CoreManager';
import configApp from 'configs/app';

const OEM = configApp.OEM;
const AppLayout = require('../oem/' + OEM + '/AppLayout').default;
const EmptyLayout = require('../oem/' + OEM + '/EmptyLayout').default;

export default function asyncComponent(getComponent, Layout=AppLayout) {
  class AsyncComponent extends Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
      // console.log(this.props, ' show props at async component');
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        if (!Layout) {
          Layout = EmptyLayout;
        }

        const LayoutWrapper = CoreManager({
          page: this.props.pathname,
          pageId: 'default'
        })(Layout, Component, this.props);

        return <LayoutWrapper />;
      }
      return null;
    }
  }

  return AsyncComponent;
}
