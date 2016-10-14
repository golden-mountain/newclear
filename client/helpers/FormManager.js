import { reduxForm } from 'redux-form/immutable'; // imported Field
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { mapValues } from 'lodash';

// import * as axapiActions from 'redux/modules/app/axapi';
// import * as formActions from 'redux/modules/app/form';

// import { getAxapiResponse, getPageVar } from 'helpers/stateHelper';

// Page Connector
const FormManager = config => warppedElement => {

  let form = reduxForm({
    form: config.form
  } )(warppedElement);

  // const bindPage = actionCreator => actionCreator.bind(null, config.page);
  // delete axapiActions.default;
  // delete formActions.default;
  // const appActions = {
  //   ...axapiActions,
  //   ...formActions
  // };
  // const boundAppAcs = mapValues(appActions, bindPage);
  form = connect(
    (state) => {
      return {
        pageForm: state.getIn([ 'form', config.form ]), // invalid on context
        initialValues: config.initialValues,// invalid on context
        env: config // valid on context
      };
    },
    // (dispatch) => ( bindActionCreators(boundAppAcs, dispatch) )

  )(form);

  return form;
};

export default FormManager;
