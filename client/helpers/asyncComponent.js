import React, { Component } from 'react';
import AppLayout from '../layouts/a10/AppLayout';

export default function asyncComponent(getComponent, Layout=AppLayout) {
  return class AsyncComponent extends Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        if (typeof Layout == 'object') {
          console.log(Layout);
          return <Layout><Component {...this.props} /></Layout>;
        } else {
          // console.log(Component, this.props);
          return <Component {...this.props} />;
        }
      }
      return null;
    }
  };
}
