import React, { PropTypes } from 'react';
// import { REDIRECT_ROUTE } from 'configs/messages/REDIRECT_ROUTE';

export default class PageBase extends React.Component {

  static contextTypes = {
    props: PropTypes.object,
    // context: PropTypes.object,
    cm: PropTypes.object
  }

  // static childContextTypes = {
  //   props: PropTypes.object,
  //   // context: PropTypes.object,
  //   cm: PropTypes.object
  // }
  //
  // state={
  //   activePage: 'list'
  // }

  constructor(props, context) {
    super(props, context);
    // console.log(this.props);
    // console.log(this.context);
    // this.cm.ballKicker.accept([], REDIRECT_ROUTE, (from, to, params) => {
    //   console.log(from, to, params);
    // }, []);
  }

}
