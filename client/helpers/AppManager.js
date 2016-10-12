// import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';

import appActions from 'redux/modules/app/index';
import { getAxapiResponse, getPageVar } from 'helpers/stateHelper';
import appConfigs from 'configs/app';

// import PageLayout from `layouts/${appConfigs.LAYOUT}/PageLayout`;

// Page Connector
const AppManager = config => warppedElement => {

  const bindPage = actionCreator => actionCreator.bind(null, config.page);

  const boundAppAcs = mapValues(appActions, bindPage);
  let page = connect(
    (state) => {
      return {
        axapiResponse: getAxapiResponse(state, config.page), // invalid on context
        pageVar: getPageVar(state, config.page), // invalid on context
        pageEnv: config, // valid on context
        env: config,
        appEnv: appConfigs
      };
    },
    (dispatch) => ( bindActionCreators(boundAppAcs, dispatch) )
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
