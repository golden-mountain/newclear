import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav, Breadcrumb } from 'react-bootstrap';
import Loading from 'react-loading';

import Menu from './Menu';
import './scss/AppLayout.scss';

import LoginForm from 'pages/Auth/components/Form';
import { LAST_PAGE_KEY } from 'configs/appKeys';
import NotificationSystem from 'react-notification-system';
import { HIDE_COMPONENT_MODAL } from 'configs/messages';
import configApp from 'configs/app';

const OEM = configApp.OEM;
const ModalLayout = require('layouts/' + OEM + '/ModalLayout').default;

class AppLayout extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  static contextTypes = {
    props: PropTypes.object.isRequired,
    cm: PropTypes.object.isRequired
  }

  state = {
    showLogin: !~sessionStorage.token,
    showError: false
  };

  constructor(props, context) {
    super(props, context);
    this.context.cm.ballKicker.accept([], HIDE_COMPONENT_MODAL, (from, to, params) => { //eslint-disable-line
      this.setState({ showLogin: false });
    }, [ 'app', 'default', 'modal', 'instance' ]);
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    const { statusCode, errMsg, error, notifiable, axapiUid } = nextProps;

    if (notifiable && axapiUid != this.props.axapiUid) {
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
    // console.log('context on layout', this);

    return (
      <main >
        <Menu>
          <Nav pullRight>
            { this.props.isLoading && <Loading type='cylon' color='#e3e3e3'/> }
          </Nav>
        </Menu>

        <Breadcrumb>
          <Breadcrumb.Item href="#">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">
            Library
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            Data
          </Breadcrumb.Item>
        </Breadcrumb>

        <NotificationSystem ref="notificationSystem" />
        <div className="container-fluid">
          {this.props.children}
        </div>

        <ModalLayout visible={this.state.showLogin}  onHide={this.close} title="Login" >
          <LoginForm modal />
        </ModalLayout>
      </main>
    );
  }
}

let InitializeFromStateForm = connect(
  (state) => ({
    isLoading: state.getIn([ 'app', LAST_PAGE_KEY, 'axapi', 'isLoading' ], false),
    axapiUid: state.getIn([ 'app', LAST_PAGE_KEY, 'axapiUid' ]),
    statusCode: state.getIn([ 'app', LAST_PAGE_KEY, 'axapi', 'statusCode' ]),
    errMsg: state.getIn([ 'app', LAST_PAGE_KEY, 'axapi', 'response', 'err', 'msg' ]),
    notifiable: state.getIn([ 'app', LAST_PAGE_KEY, 'axapiNeedNotify' ])
  })
)(AppLayout);

export default InitializeFromStateForm;
