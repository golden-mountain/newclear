import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as axapiActions from 'redux/modules/axapi';
import { reduxForm } from 'a10-redux-form/immutable'; // imported Field
import LoginForm from '../../components/Form/Login';
import { Form } from 'react-bootstrap';

class LoginPage extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.response && nextProps.response.authresponse &&  nextProps.response.authresponse.signature
    ) {
      const { location } = this.props;
      if (location.state && location.state.nextPathname) {
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
    return this.props.request(fullAuthData);
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


let InitializeFromStateForm = reduxForm({
  form: 'login'
}
 )(LoginPage);

InitializeFromStateForm = connect(
  (state) => ({
    response: state.getIn([ 'axapi', 'response' ], {})
  }),
  (dispatch) => bindActionCreators(axapiActions, dispatch)
)(InitializeFromStateForm);

export default withRouter(InitializeFromStateForm);
