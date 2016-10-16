import { reduxForm } from 'redux-form/immutable'; // imported Field
import { connect } from 'react-redux';

const PageConnector = config => warppedElement => {

  let form = reduxForm({
    form: config.form
  } )(warppedElement);


  form = connect(
    (state) => {
      return {
        pageForm: state.getIn([ 'form', config.form ]), // invalid on context
        initialValues: config.initialValues,// invalid on context
        env: config,
        app: state.getIn([ 'app' ])
      };
    }
  )(form);

  return form;
};

export default PageConnector;
