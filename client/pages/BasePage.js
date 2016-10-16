import { Component } from 'react';
// import invariant from 'invariant';

export default class BasePage extends Component {

  // constructor(props, context) {
  //   super(props, context);
  // }

  // // getChildContext() {
  // //   return {  props: this.props };
  // // }
  // registerPage(configs) {
  //   this.context.props.registerCurrentPage(configs);
  //   if (this.props.visible === undefined || this.props.visible) {
  //     this.context.props.setPageVisible(configs.page, true);
  //   } else {
  //     this.context.props.setPageVisible(configs.page, false);
  //   }
  //   // get connected url keys
  //   // if (this.props.urlKeysConnect) {
  //   //   console.log('url keys connect:', this.context.props.urlKeysConnect);
  //   // }
  // }

  // componentWillMount() {
  //   // invariant(this.context.props.registerCurrentPage, 'BasePage not a single page component, depends on child page component');
  //   if (this.props.env) {
  //     this.registerPage(this.props.env);
  //   } else {
  //     this.registerPage(this.context.props.env);
  //   }
  // }

  // componentWillUnmount() {
  //   // console.log('will unmount this'); 
  //   this.context.props.destroyPage();
  // }
}

// BasePage.contextTypes = {
//   props: PropTypes.object.isRequired
// };
