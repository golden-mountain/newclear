import React, { PropTypes } from 'react';
import { Redirect } from 'react-router';
import { isEqual } from 'lodash';
import { unmountComponent } from 'redux/modules/app/component';

import { REDIRECT_ROUTE } from 'configs/messages';

const pageWrapper = (Page) => {

  class PageWrapper extends React.Component {

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
    state={
      path: '',
      params: {}
    }

    // constructor(props, context) {
    //   super(props, context);
    //   console.log(this.props);
    //   // console.log(this.context);
    // }

    componentWillMount() {
      // console.log(this.props.pathname);
      this.context.cm.ballKicker.accept([], REDIRECT_ROUTE, (from, to, pathParams) => { // eslint-disable-line
        // console.log(from, to, pathParams);
        const { path, params } = pathParams;
        this.setState({ path: this.getRedirectPath(path), params });
      }, this.basePath);
    }

    componentWillUnmount() {
      // console.log('removed event from ', this.basePath);
      this.context.cm.ballKicker.removeEvent(this.basePath);
      // console.log(this.context.props.pagePath, '........');
      this.context.props.dispatch(unmountComponent(this.context.props.pagePath));
    }

    get basePath() {
      const paths = this.props.pathname.split('/').filter(path => path);
      // paths.pop();
      return paths;
    }

    getRedirectPath(suffix) {
      if (suffix.indexOf('/') > -1) {
        return suffix;
      } else {
        const paths = this.basePath;
        paths.pop();
        paths.push(suffix);
        return '/' + paths.join('/');
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return this.state.path !== nextState.path && !isEqual(nextState.params, this.state.params);
    }

    render() {
      return this.state.path ? (<Redirect to={{
        pathname: this.state.path,
        params: this.state.params,
        state: { from: this.props.location }
      }} />) : (<Page {...this.props} />);
    }

  }

  return PageWrapper;
};

export default pageWrapper;
