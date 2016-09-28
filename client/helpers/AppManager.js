// import { PropTypes } from 'react';

import { reduxForm } from 'redux-form/immutable'; // imported Field
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';

import * as axapiActions from 'redux/modules/app/axapi';
import * as pageActions from 'redux/modules/app/page';
import * as themeActions from 'redux/modules/app/theme';
import * as featureActions from 'redux/modules/app/feature';
import * as formActions from 'redux/modules/app/form';

// import * as logger from 'helpers/logger';
import { getAxapiResponse, getPageVar } from 'helpers/stateHelper';

// Page Connector
const AppManager = config => warppedElement => {
  // warppedElement.childContextTypes = {
  //   env: PropTypes.object.isRequired
  // };

  // warppedElement.getChildContext = () => {
  //   console.log('context fetching');
  //   return { env: config };
  // };

  let form = reduxForm({
    form: config.form || config.page  
  } )(warppedElement);

  const bindPage = actionCreator => actionCreator.bind(null, config.page);
  delete axapiActions.default;
  delete pageActions.default;
  delete themeActions.default;
  delete featureActions.default;
  delete formActions.default;
  const appActions = {
    ...axapiActions,
    ...pageActions,
    ...themeActions,
    ...featureActions,
    ...formActions
  };
  const boundAppAcs = mapValues(appActions, bindPage);
  form = connect(
    (state) => {
      return {
        pageForm: state.getIn([ 'form', config.form ]),
        axapiResponse: getAxapiResponse(state, config.page),
        initialValues: config.initialValues,
        page: getPageVar(state, config.page),
        env: config
      };
    },
    (dispatch) => ( bindActionCreators(boundAppAcs, dispatch) )
    // (stateProps, dispatchProps, ownProps) => {
    //   let { pageForm } = stateProps;

    //   const myProps = {
    //     foo: () => {
    //       if (pageForm) {
    //         logger.group('page from foo', pageForm.toJS());
    //       }
    //     }
    //   };
    //   return Object.assign(myProps, stateProps, dispatchProps, ownProps);
    // }
  )(form);

  return form;
};

export default AppManager;
