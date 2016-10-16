import { Component, PropTypes } from 'react';
// import invariant from 'invariant';
// import { isEqual } from 'lodash';

export default class BaseForm extends Component {
  constructor(props, context) {
    super(props, context);
  }

  getChildContext() {
    console.log('context props:', this.context.props, 'props:', this.props);
    return {  props: this.props };
  }

  componentWillMount() {
    // invariant(this.context.props.registerCurrentPage, 'BasePage not a single page component, depends on child page component');
    this.props.registerCurrentPage(this.props.env);
    if (this.props.visible === undefined || this.props.visible) {
      this.props.setPageVisible(this.props.env.page, true);
    } else {
      this.props.setPageVisible(this.props.env.page, false);
    }    
  }

  componentWillUnmount() {
    // console.log('will unmount this'); 
    this.props.destroyPage();
  }
}

BaseForm.childContextTypes = {
  props: PropTypes.object.isRequired
};

