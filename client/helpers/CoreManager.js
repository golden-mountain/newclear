import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';
import { reduxForm } from 'redux-form/immutable'; // imported Field

import { getAxapiResponse, getPageVar, getAxapiUid } from 'helpers/stateHelper';
// import PageLayout from 'layouts/a10/PageLayout';
// import { LAST_PAGE_KEY } from 'configs/appKeys';
import { buildInstancePath } from 'helpers/actionHelper';
import ComponentManager from 'helpers/ComponentManager';
// import A10Modal from 'components/Modal';

// Page Connector
const CoreManager = config => ( Layout, WrappedElement, WrappedProps) => {
  const pagePath = buildInstancePath(config.page, 'default' );

  class Core extends React.Component {
    static childContextTypes = {
      props: PropTypes.object,
      cm: PropTypes.object
    }

    static contextTypes = {
      store: PropTypes.object
    }

    //cm == component manager
    constructor(props, context) {
      super(props, context);
      // console.log(props, this.context);
      this.cm = new ComponentManager(this.props);
      this.cm.registerComponent(pagePath);
    }

    getChildContext() {
      return {  props: this.props, cm: this.cm };
    }

    componentWillMount() {
      this.props.registerCurrentPage(Object.assign({}, this.props.env));
      // if (this.props.visible === undefined || this.props.visible) {
      //   this.props.setPageVisible(this.props.env.page, true, this.props.pageId);
      // } else {
      //   this.props.setPageVisible(this.props.env.page, false, this.props.pageId);
      // }
    }

    componentWillUnmount() {
      // this.props.setPageVisible(this.props.env.page, false, this.props.pageId);
      this.props.destroyPage();
    }

    render() {
      return <Layout> <WrappedElement {...WrappedProps} /> </Layout>;
    }
  }

  if (!config.page) {
    config.page = '404';
  }

  if (!config.form) {
    config.form = config.page;
  }

  let page = reduxForm({
    form: config.form
    // enableReinitialize: true
  } )(Core);

  // console.log(pagePath);
  const bindPageInstance = actionCreator => actionCreator.bind(null, pagePath);
  const boundAppAcs = mapValues(window.appActions, bindPageInstance);

  page = connect(
    (state) => {
      return {
        // isLoading: state.getIn([ 'app', LAST_PAGE_KEY, 'axapi', 'isLoading' ], false),
        // statusCode: state.getIn([ 'app', LAST_PAGE_KEY, 'axapi', 'statusCode' ]),
        // errMsg: state.getIn([ 'app', LAST_PAGE_KEY, 'axapi', 'response', 'err', 'msg' ]),
        // notifiable: state.getIn([ 'app', LAST_PAGE_KEY, 'axapiNeedNotify' ]),
        axapiUid: getAxapiUid(state),
        axapiResponse: getAxapiResponse(state, pagePath), // invalid on context
        initialValues: config.initialValues, // invalid on context
        page: getPageVar(state, pagePath), // invalid on context
        pagePath,
        env: config // valid on context
      };
    },
    (dispatch) => bindActionCreators(boundAppAcs, dispatch)
  )(page);

  return page;
};

export default CoreManager;
