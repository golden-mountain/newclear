import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';
import { reduxForm } from 'redux-form/immutable'; // imported Field

import { getAxapiResponse, getPageVar, getAxapiUid } from 'helpers/stateHelper';
import PageLayout from 'layouts/a10/PageLayout';

// Page Connector
const AppManager = config => WarppedElement => {

  class BasePage extends React.Component {
    static childContextTypes = {
      props: PropTypes.object.isRequired
    }
    
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

    render() {
      return <PageLayout> <WarppedElement /></PageLayout>;
    }
  }

  if (!config.form) {
    config.form = config.page;
  }

  let page = reduxForm({
    form: config.form
  } )(BasePage);

  page = connect(
    (state) => {
      return {
        axapiUid: getAxapiUid(state),
        axapiResponse: getAxapiResponse(state, config.page), // invalid on context
        initialValues: config.initialValues, // invalid on context
        page: getPageVar(state, config.page), // invalid on context
        env: config // valid on context
      };
    },
    (dispatch) => {
      const bindPage = actionCreator => actionCreator.bind(null, config.page);
      const boundAppAcs = mapValues(window.appActions, bindPage);
      return bindActionCreators(boundAppAcs, dispatch);
    }
  )(page);

  return page;
};

export default AppManager;
