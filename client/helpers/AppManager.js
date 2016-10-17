// import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';
// import { reduxForm } from 'redux-form/immutable'; // imported Field

import { getAxapiResponse, getPageVar, getAxapiUid } from 'helpers/stateHelper';
// import appConfigs from 'configs/app';
// import appActions from 'redux/modules/app/index';
// import * as pageActions from 'redux/modules/app/page';
// import * as themeActions from 'redux/modules/app/theme';
// import * as featureActions from 'redux/modules/app/feature';

// Page Connector
const AppManager = config => warppedElement => {


  // delete pageActions.default;
  // delete themeActions.default;
  // delete featureActions.default;
  // const appActions = {
  //   ...pageActions,
  //   ...themeActions,
  //   ...featureActions
  // };
  // let page = reduxForm({
  //   form: config.form
  // } )(warppedElement);

  let page = connect(
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
  )(warppedElement);
  // console.log(appConfigs);
  // const componentPath = `layouts/${appConfigs.LAYOUT}/PageLayout`;
  // console.log(componentPath);
  // componentPath = 'layouts/a10/PageLayout';

  // const PageLayout = require(componentPath);
  // const PageLayout = require('layouts/a10/PageLayout');
  // return React.createElement(PageLayout, {}, page);
  // return <PageLayout>{page}</PageLayout>;
  return page;
};

export default AppManager;
