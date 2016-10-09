import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable'; // imported Field
import * as axapiActions from 'redux/modules/app/axapi';

// import auth from 'helpers/auth';
import { Modal, Button, Form, Fade, Alert } from 'react-bootstrap';

import Toolbar from 'components/Toolbar';
import './style.scss';

import LoginForm from 'components/Form/Login';
// import AppManager from 'helpers/AppManager';
import { LAST_PAGE_KEY, APP_LAYOUT_PAGE_KEY } from 'configs/appKeys';

class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state = {
      showLogin: !~sessionStorage.token, 
      showError: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { statusCode } = nextProps;

    this.setState({
      showLogin: statusCode === 401 || statusCode === 403, 
      showError: statusCode >= 400
    });

    if (statusCode) {
      if (this.errorTimeout) {
        clearTimeout(this.errorTimeout);
      }

      this.errorTimeout = setTimeout(() => {
        this.props.clearAxapiLastError();
      }, 5000);
    }
  }

  onSubmit(values) {
    const fullAuthData = {
      path: '/axapi/v3/auth',
      method: 'POST', 
      body: values
    };
    // console.log(this.props.axapiRequest);
    return this.props.axapiRequest(APP_LAYOUT_PAGE_KEY, fullAuthData);
  }

  submit() {
    // console.log('test submit', this.refs.form);
    return this.refs.form.props.onSubmit();
  }

  close() {
    this.setState({ showLogin: false });
  }

  handleAlertDismiss() {
    this.setState({ showError: false });    
  }

  render() {
    const { handleSubmit, statusCode, errMsg, error } = this.props;
    // console.log('this.props', this.props, error, errMsg, ' error and errMsg');
    let bsClass = 'success', info = '';
    if (statusCode != 200) {
      info = error || errMsg;
      bsClass = 'danger';
    }

    return (
      <main className="main-app">
        <Toolbar />
        <Fade in={this.state.showError} transitionAppear={true} unmountOnExit={true}>
          <Alert bsStyle={ bsClass } onDismiss={::this.handleAlertDismiss}> { info } </Alert>
        </Fade>
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
    statusCode: state.getIn([ 'app', LAST_PAGE_KEY, 'axapi', 'statusCode' ]),
    errMsg: state.getIn([ 'app', LAST_PAGE_KEY, 'axapi', 'response', 'err', 'msg' ])
  }),
  (dispatch) => bindActionCreators(axapiActions, dispatch)
)(InitializeFromStateForm);

// TO Fix: if add those, why app reducers can't be triggered????
// const InitializeFromStateForm = AppManager({
//   page: '__app__',
//   form: '__appLoginForm', 
//   initialValues: {}
// })(App);


export default InitializeFromStateForm;
