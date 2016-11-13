import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';
// import { reduxForm } from 'redux-form/immutable'; // imported Field

// import { getAxapiResponse, getPageVar, getAxapiUid } from 'helpers/stateHelper';
// import PageLayout from 'oem/PageLayout';
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

  // if (!config.form) {
  //   config.form = config.page;
  // }

  const bindPageInstance = actionCreator => actionCreator.bind(null, pagePath);
  const boundAppAcs = mapValues(window.appActions, bindPageInstance);

  let page = connect(
    () => {
      return {
        pagePath,
        env: config // valid on context
      };
    },
    (dispatch) => bindActionCreators(boundAppAcs, dispatch)
  )(Core);

  return page;
};

export default CoreManager;
