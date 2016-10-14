import { Component, PropTypes } from 'react';
import invariant from 'invariant';

export default class BasePage extends Component {

  getChildContext() {
    return {  props: this.props  };
  }

  componentWillMount() {
    invariant(this.props.registerCurrentPage, 'BasePage not a single page component, depends on child page component');
    this.props.registerCurrentPage(this.props.env);
    if (this.props.visible === undefined || this.props.visible) {
      this.props.setPageVisible(this.props.env.page, true);
    } else {
      this.props.setPageVisible(this.props.env.page, false);
    }
    // get connected url keys
    if (this.props.urlKeysConnect) {
      console.log('url keys connect:', this.props.urlKeysConnect);
    }
  }

  componentWillUnmount() {
    // console.log('will unmount this'); 
    this.props.destroyPage();
  }
}

BasePage.childContextTypes = {
  props: PropTypes.object.isRequired
};
