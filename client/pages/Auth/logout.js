import React, {Component, PropTypes} from 'react';
import auth from 'helpers/auth'
import { withRouter } from 'react-router';

class Logout extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  componentDidMount() {
    auth.logout();
    this.redirectToLogin();
  }

  redirectToLogin() {
    this.props.router.replace('/login');
  }

  render() {
    return <p>You are now logged out</p>
  }
}

export default withRouter(Logout);
