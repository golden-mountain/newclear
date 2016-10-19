import { Component, PropTypes } from 'react';
// import invariant from 'invariant';
// import { isEqual } from 'lodash';

export default class Base extends Component {
  constructor(props, context) {
    super(props, context);
  }

  getChildContext() {
    // console.log('context props:', this.context.props, 'props:', this.props);
    return {  props: this.props };
  }

  componentWillMount() {
    // invariant(this.context.props.registerCurrentPage, 'BasePage not a single page component, depends on child page component');
    // console.log('this props:', this.props);
    this.props.registerCurrentPage(Object.assign({}, this.props.env, { pageId: this.props.pageId || 'default' }));
    if (this.props.visible === undefined || this.props.visible) {
      this.props.setPageVisible(this.props.env.page, true, this.props.pageId);
    } else {
      this.props.setPageVisible(this.props.env.page, false, this.props.pageId);
    }    
  }

  componentWillUnmount() {
    // console.log('will unmount this', this.props.env.page); 
    this.props.setPageVisible(this.props.env.page, false, this.props.pageId);
    this.props.destroyPage();
  }
}

Base.childContextTypes = {
  props: PropTypes.object.isRequired
};

