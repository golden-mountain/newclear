import React, { Component } from 'react';
import AppLayout from '../layouts/a10/AppLayout';
import EmptyLayout from '../layouts/a10/EmptyLayout';
// import AppManager from 'helpers/AppManager';

// const createLayoutWrapper = (Layout, configs) => {
//   class Wrapper extends Component {
//     static childContextTypes = {
//       props: PropTypes.object.isRequired
//     }

//     getChildContext() {
//       return {  props: this.props  };
//     }

//     render() {
//       return <Layout>{ this.props.children }</Layout>;
//     }
//   }

//   return AppManager(configs)(Wrapper);
// };

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
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        // console.log(Component, this.props);
        if (!Layout) {
          Layout = EmptyLayout;
        }

        // const LayoutWrapper = createLayoutWrapper(Layout, {
        //   page: this.props.pathname,
        //   form: this.props.pathname
        // });
          
        return <Layout><Component {...this.props} /></Layout>;
      }
      return null;
    }
  }

  return AsyncComponent;
}
