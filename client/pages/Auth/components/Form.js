import React, { PropTypes } from 'react';
import Redirect from 'react-router/Redirect';
import { FormControl } from 'react-bootstrap';
import { A10SchemaField } from 'components/Form/A10Field';
import A10SubmitButtons from 'components/Form/A10SubmitButtons';
import A10Form from 'components/Form/A10Form';
import { required } from 'helpers/validations';
import { widgetWrapper } from 'helpers/widgetWrapper';
// import auth from 'helpers/auth';
import { getPayload } from 'helpers/axapiHelper';
import { UPDATE_TARGET_DATA } from 'configs/messages';

class LoginForm extends React.Component {
  static contextTypes = {
    props: PropTypes.object.isRequired,
    cm: PropTypes.object.isRequired
  }

  static displayName = 'LoginForm'

  onSubmit(values) {
    // console.log('handle submit');
    const fullAuthData = getPayload('/axapi/v3/auth', 'POST', values);
    const promise = this.props.comAxapiRequest(fullAuthData);
    return promise;
  }

  shouldComponentUpdate(nextProps) {
    const { data, modal } = nextProps;
    if (data && data.signature && modal) {
      // everything need update if logined
      this.props.kickBall(UPDATE_TARGET_DATA);
      return false;
    }

    return true;
  }

  render() {
    const { data, modal } = this.props;
    const { from } = '/';

    return (
      data && data.signature ? (modal ? null : <Redirect to={{ pathname: from || '/' }} />) :
      <A10Form onSubmit={this.context.props.handleSubmit(::this.onSubmit)} horizontal>
        <A10SchemaField name="credentials.username" label="Username" validation={{ required }}>
          <FormControl type="text" className="form-control"/>
        </A10SchemaField>

        <A10SchemaField name="credentials.password" label="Password" validation={{ required }}>
          <FormControl type="password" className="form-control"/>
        </A10SchemaField>

        <A10SubmitButtons buttons={[ 'login', 'reset' ]}/>

      </A10Form>
    );
  }
}

export default widgetWrapper((state) => {
  return {
    // env: getAppEnvVar(state),
    app: state.getIn([ 'app' ])
    // form: state.getIn([ 'form' ])
  };
})(LoginForm);
