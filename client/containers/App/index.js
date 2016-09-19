import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import auth from 'helpers/auth';
import { Modal, Button, Form } from 'react-bootstrap';
import { reduxForm } from 'a10-redux-form/immutable'; // imported Field

import Toolbar from 'components/Toolbar';
import './style.scss';

import LoginForm from 'components/Form/Login';
import * as axapiActions from 'redux/modules/axapi';

class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state = {
      showLogin: !~sessionStorage.token
    };
  }

  componentWillReceiveProps(nextProps) {
    const { statusCode } = nextProps;

    this.setState({
      showLogin: statusCode === 401 || statusCode === 403
    });
  }


  onSubmit(values) {
    const fullAuthData = {
      path: '/axapi/v3/auth',
      method: 'POST', 
      body: values
    };
    return this.props.request(fullAuthData);
  }

  submit() {
    // console.log('test submit', this.refs.form);
    return this.refs.form.props.onSubmit();
  }

  close() {
    this.setState({ showLogin: false });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <main className="main-app">
        <Toolbar />
        {this.props.children}
          <Modal show={this.state.showLogin} onHide={this.close}>
              <Modal.Header>
                <Modal.Title>Login</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form onSubmit={handleSubmit(::this.onSubmit)} ref="form" horizontal>
                  <LoginForm dialogMode={true} />
                </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button onClick={::this.close}>Close</Button>
                <Button bsStyle="primary" onClick={::this.submit}>Login</Button>
              </Modal.Footer>
          </Modal>
      </main>
    );
  }
}

let InitializeFromStateForm = reduxForm({
  form: 'app'
}
 )(App);

InitializeFromStateForm = connect(
  (state) => ({
    statusCode: state.getIn([ 'axapi', 'statusCode' ], '200')
  }),
  (dispatch) => bindActionCreators(axapiActions, dispatch)
)(InitializeFromStateForm);

export default InitializeFromStateForm;
