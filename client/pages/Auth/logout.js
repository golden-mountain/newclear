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
    // need call axapi before auth.logout
    auth.logout();
    this.redirectToLogin();
  }

  redirectToLogin() {
    this.props.router.replace('/login');
  }

  render() {
    return false;
  }
}

export default withRouter(Logout);
