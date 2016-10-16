import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import Menu from './Menu';
import './scss/AppLayout.scss';

import LoginForm from 'pages/Auth/components/Form';
import { LAST_PAGE_KEY } from 'configs/appKeys';
import NotificationSystem from 'react-notification-system';

class AppLayout extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  state = {
    showLogin: !~sessionStorage.token, 
    showError: false
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    const { statusCode, errMsg, error, notifiable } = nextProps;

    if (notifiable) {
      let bsClass = 'success', info = 'Success';
      let _notify = {
        title: 'Hi, Something Wrong!!',
        message: '',
        autoDismiss: 10,
        level: bsClass,
        position: 'tr',
        dismissible: true,
        uid: nextProps.axapiUid
      };

      if (statusCode >= 400) {
        info = error || errMsg;
        bsClass = 'error';
        _notify.level = bsClass;
        _notify.message = info;
      } else if (statusCode >= 200 && statusCode < 300) {
        bsClass = 'success';
        info = 'Operation Success!';
        _notify.level = bsClass;
        _notify.message = info;
      }
      this._notificationSystem.addNotification(_notify);
    }

    this.setState({
      showLogin: statusCode === 401 || statusCode === 403, 
      showError: statusCode >= 400
    });

    
  }


  render() {
    return (
      <main >
        <Menu />
        
        <NotificationSystem ref="notificationSystem" />
        <div className="container-fluid">
          {this.props.children}
        </div>
        <Modal show={this.state.showLogin} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <LoginForm />
          </Modal.Body>

        </Modal>
      
      </main>
    );
  }
}

let InitializeFromStateForm = connect(
  (state) => ({
    axapiUid: state.getIn([ 'app', LAST_PAGE_KEY, 'axapiUid' ]),
    statusCode: state.getIn([ 'app', LAST_PAGE_KEY, 'axapi', 'statusCode' ]),
    errMsg: state.getIn([ 'app', LAST_PAGE_KEY, 'axapi', 'response', 'err', 'msg' ]),
    notifiable: state.getIn([ 'app', LAST_PAGE_KEY, 'axapiNeedNotify' ])
  })
)(AppLayout);

export default InitializeFromStateForm;
