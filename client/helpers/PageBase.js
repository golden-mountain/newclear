import React from 'react';
// import { REDIRECT_ROUTE } from 'configs/messages';

export default class PageBase extends React.Component {

  // static contextTypes = {
  //   props: PropTypes.object,
  //   // context: PropTypes.object,
  //   cm: PropTypes.object
  // }

  // // static childContextTypes = {
  // //   props: PropTypes.object,
  // //   // context: PropTypes.object,
  // //   cm: PropTypes.object
  // // }
  // //
  // state={
  //   path: '',
  //   params: {}
  // }

  // constructor(props, context) {
  //   super(props, context);
  //   console.log(this.props);
  //   console.log(this.context);
  //   this.context.cm.ballKicker.accept([], REDIRECT_ROUTE, (from, to, pathParams) => { // eslint-disable-line
  //     // console.log(from, to, pathSuffix);
  //     const { path, params } = pathParams;
  //     this.setState({ path: this.getRedirectPath(path), params });
  //   }, []);
  // }

  // getRedirectPath(suffix) {
  //   const paths = this.props.pathname.split('/').filter(path => path);
  //   paths.pop();
  //   paths.push(suffix);
  //   return '/' + paths.join('/'); 
  // }

}
