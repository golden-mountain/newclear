import React, {Component, PropTypes} from 'react';
import auth from 'helpers/auth'

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
    auth.logout()
  }

  render() {
    return <p>You are now logged out</p>
  }
}

export default Logout
