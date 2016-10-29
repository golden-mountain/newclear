import React, { Component } from 'react';
import AppLayout from '../layouts/a10/AppLayout';
import EmptyLayout from '../layouts/a10/EmptyLayout';
import CoreManager from 'helpers/CoreManager';

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
