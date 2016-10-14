import React from 'react';
import Redirect from 'react-router/Redirect';
import { FormControl } from 'react-bootstrap';

import { A10SchemaField } from 'components/Form/A10Field';
import A10SubmitButtons from 'components/Form/A10SubmitButtons';
import A10Form from 'components/Form/A10Form';
import FormManager from 'helpers/FormManager';
// import BaseForm from 'pages/BaseForm';
import { required } from 'helpers/validations';
import BaseForm from 'pages/BaseForm';

class LoginForm extends BaseForm {
  state = {
    sessionID: false
  }

  onSubmit(values) {
    console.log('submitting...........');
    const fullAuthData = {
      path: '/axapi/v3/auth',
      method: 'POST',
      body: values
    };
    // this.props.setPageTitle('testaaaaaaaaaaaaaa');
    const promise = this.context.props.axapiRequest(fullAuthData);
    promise.then((result) => {
      console.log(result, ' axapi response');
      this.setState({ sessionID: true });
    });
    return promise;
  }

  render() {
    const { handleSubmit, from } = this.props;
    const { sessionID } = this.state;

    return (
      sessionID ? <Redirect to={from || '/'}/> :
      <A10Form onSubmit={handleSubmit(::this.onSubmit)} horizontal>
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

const initialValues = {
};

const InitializeFromStateForm = FormManager({
  form: 'loginForm', 
  initialValues
})(LoginForm);


export default InitializeFromStateForm;
