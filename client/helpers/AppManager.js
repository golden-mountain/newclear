import { reduxForm } from 'a10-redux-form/immutable'; // imported Field
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';
import { Iterable, Map } from 'immutable';

import * as axapiActions from 'redux/modules/app/axapi';
import * as pageActions from 'redux/modules/app/page';
import * as themeActions from 'redux/modules/app/theme';
import * as featureActions from 'redux/modules/app/feature';

export const getAxapiResponse = (state, page) => Iterable.isIterable(state) ? state.getIn([ 'app', 'axapi', page ]) : Map({});
export const getPageVar = (state, page) => Iterable.isIterable(state) ? state.getIn([ 'app', 'page', page ]) : Map({});

// Page Connector
const AppManager = config => warppedElement => {
  let form = reduxForm({
    form: config.form || config.page  
  } )(warppedElement);

  const bindPage = actionCreator => actionCreator.bind(null, config.page);
  delete axapiActions.default;
  delete pageActions.default;
  delete themeActions.default;
  delete featureActions.default;
  const appActions = {
    ...axapiActions,
    ...pageActions,
    ...themeActions,
    ...featureActions
  };
  const boundAppAcs = mapValues(appActions, bindPage);
  form = connect(
    (state) => ({
      axapiResponse: getAxapiResponse(state, config.page),
      initialValues: config.initialValues,
      page: getPageVar(state, config.page)
    }),
    (dispatch) => ( bindActionCreators(boundAppAcs, dispatch) )
  )(form);
  return form;
};

export default AppManager;
