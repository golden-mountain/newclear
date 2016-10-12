import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import FormManager from 'helpers/FormManager';
import LoginForm from 'components/Form/Login';
import { Form } from 'react-bootstrap';
import BaseForm from 'pages/BaseForm';

class LoginPage extends BaseForm {
  static propTypes = {
    children: PropTypes.node
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.axapiResponse && nextProps.axapiResponse.getIn([ 'response', 'signature' ])) {
      const { location } = this.props;
      if (location.state && location.state.nextPathname ) {
        this.props.router.replace(location.state.nextPathname);
      } else {
        this.props.router.replace('/');
      }
      return false;
    }
    return true;

  }

  onSubmit(values) {
    const fullAuthData = {
      path: '/axapi/v3/auth',
      method: 'POST',
      body: values
    };
    this.props.setPageTitle('testaaaaaaaaaaaaaa');
    return this.props.axapiRequest(fullAuthData);
  }

  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props;
    const subProps = { pristine, submitting, reset };
    return (
      <div className="fluid-container">
        <Form onSubmit={handleSubmit(::this.onSubmit)} horizontal>
          <LoginForm { ...subProps } />
        </Form>
      </div>
    );
  }

}

const initialValues = {
  credentials: {
    username: 'admin',
    password: 'a10'
  }
};

const InitializeFromStateForm = FormManager({
  page: 'login',
  form: 'loginForm',
  initialValues: initialValues
})(LoginPage);


export default withRouter(InitializeFromStateForm);
