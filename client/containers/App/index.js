import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form/immutable'; // imported Field
import * as axapiActions from 'redux/modules/app/axapi';

// import auth from 'helpers/auth';
import { Modal, Button, Form } from 'react-bootstrap';

import Toolbar from 'components/Toolbar';
import './style.scss';

import LoginForm from 'components/Form/Login';
// import AppManager from 'helpers/AppManager';
import { LAST_PAGE_KEY, APP_LAYOUT_PAGE_KEY } from 'configs/appKeys';
import NotificationSystem from 'react-notification-system';

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

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    const { statusCode, errMsg, error, notifiable } = nextProps;
    console.log('this.props', statusCode, error, errMsg, ' error and errMsg');

    if (notifiable) {
      let bsClass = 'success', info = 'Success';
      if (statusCode >= 400) {
        // console.log('notification 400....................');

        info = error || errMsg;
        bsClass = 'error';
        const _notify = {
          title: 'Hi, Something Wrong!!',
          message: info,
          autoDismiss: 10,
          level: bsClass,
          position: 'tl',
          dismissible: true
        };
        this._notificationSystem.addNotification(_notify);
      } else if (statusCode >= 200 && statusCode < 300) {
        // console.log('notification. 200 ...................');

        info = 'Operation Success!';
        const _notify = {
          title: 'Awesome',
          message: info,
          autoDismiss: 10,
          level: bsClass,
          position: 'tl',
          dismissible: true
        };
        this._notificationSystem.addNotification(_notify);
      }
    }

    this.setState({
      showLogin: statusCode === 401 || statusCode === 403, 
      showError: statusCode >= 400
    });

    
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
    const { handleSubmit } = this.props;
    // console.log('this.props', this.props, error, errMsg, ' error and errMsg');
    // let bsClass = 'success', info = 'Success';
    // if (statusCode != 200) {
    //   info = error || errMsg;
    //   bsClass = 'error';
    //   this._notificationSystem.addNotification();
    // } 

    return (
      <main className="main-app">
        <Toolbar />
        
        <NotificationSystem ref="notificationSystem" />
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
    errMsg: state.getIn([ 'app', LAST_PAGE_KEY, 'axapi', 'response', 'err', 'msg' ]),
    notifiable: state.getIn([ 'app', LAST_PAGE_KEY, 'axapiNeedNotify' ])
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
