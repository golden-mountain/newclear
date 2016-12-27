import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';
// import { reduxForm } from 'redux-form/immutable'; // imported Field
import { Redirect } from 'react-router';
import appActions from '../redux/modules/app/index';
import { actions } from 'a10-widget';

// import { getAxapiResponse, getPageVar, getAxapiUid } from 'helpers/stateHelper';
// import PageLayout from 'oem/PageLayout';
// import { LAST_PAGE_KEY } from 'configs/appKeys';
import { buildInstancePath, getWidgetManager } from 'a10-widget';
// import ComponentManager from 'helpers/ComponentManager';
// import A10Modal from 'components/Modal';
import { REDIRECT_ROUTE } from 'configs/messages'; // eslint-disable-line

// Page Connector
const CoreManager = config => ( Layout, WrappedElement, WrappedProps) => {

  const pagePath = buildInstancePath(config.page, 'default' );

  class Core extends React.Component {
    static childContextTypes = {
      props: PropTypes.object,
      wm: PropTypes.object
    }

    static contextTypes = {
      store: PropTypes.object
    }

    state={
      path: '',
      params: {}
    }

    //wm == component manager
    constructor(props, context) {
      super(props, context);
      this.wm = getWidgetManager(this.props.dispatch);
      this.wm.registerComponent(pagePath);
    }

    getChildContext() {
      return {  
        props: Object.assign({}, this.props, { dispatch: this.context.store.dispatch }, WrappedProps ), wm: this.wm 
      };
    }

    componentWillMount() {
      this.props.registerCurrentPage(Object.assign({}, this.props.env));
      this.wm.ballKicker.accept([], REDIRECT_ROUTE, (from, to, pathParams) => { // eslint-disable-line
        // console.log(from, to, pathParams);
        let path='', params={};
        if (typeof pathParams === 'string') {
          path = pathParams;
        } else {
          path = pathParams.path;
          params = pathParams.params;
        }
        // console.log(this.getRedirectPath(path), params);
        this.setState({ path: this.getRedirectPath(path), params });
      }, pagePath);
    }

    getRedirectPath(suffix) {
      if (suffix.indexOf('/') > -1) {
        return suffix;
      } else {
        const paths = config.page.split('/').filter(path => path);
        paths.pop();
        paths.push(suffix);
        // console.log(paths);
        return '/' + paths.join('/');
      }
    }

    componentWillUnmount() {
      // this.props.setPageVisible(this.props.env.page, false, this.props.pageId);
      this.props.destroyPage();
      this.wm.ballKicker.removeEvent(pagePath);
      this.props.unmountComponent(pagePath);
    }

    render() {
      // console.log('update at CoreManager');
      return (this.state.path ? (<Redirect to={{
        pathname: this.state.path,
        params: this.state.params,
        state: { from: config.page }
      }} />) : (<Layout> <WrappedElement {...WrappedProps} /> </Layout>));
    }
  }

  if (!config.page) {
    config.page = '404';
  }

  // if (!config.form) {
  //   config.form = config.page;
  // }

  const bindPageInstance = actionCreator => actionCreator.bind(null, pagePath);
  const boundAppAcs = mapValues({ ...appActions, ...actions }, bindPageInstance);

  let page = connect(
    () => {
      return {
        pagePath,
        instancePath: pagePath,
        env: config // valid on context
      };
    },
    (dispatch) => bindActionCreators(boundAppAcs, dispatch)
  )(Core);

  return page;
};

export default CoreManager;
