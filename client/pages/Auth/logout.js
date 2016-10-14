
import React, { Component, PropTypes } from 'react';
import auth from 'helpers/auth';
// import { withRouter } from 'react-router';
import Redirect from 'react-router/Redirect';

class Logout extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  componentDidMount() {
    auth.logout();
  }

  render() {
    const { from } = this.props.location.state || '/';
    const loggedOut = !auth.loggedIn();
    return (loggedOut && <Redirect to={{ pathname: '/login', state: { referrer: from } }}/>);
  }
}

export default Logout;
