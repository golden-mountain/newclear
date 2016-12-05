
import React, { PropTypes } from 'react';
import auth from 'helpers/auth';
// import { withRouter } from 'react-router';
import Redirect from 'react-router/Redirect';
// import PageBase from 'helpers/PageBase';

// import { widgetWrapper } from 'a10-widget';

class Logout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  state = {
    loggedOut: !auth.loggedIn()
  }

  componentDidMount() {
    auth.logout();
    this.setState({ loggedOut: true });
  }

  render() {
    const { from } = this.props.location.state || '/';
    return (this.state.loggedOut && <Redirect to={{ pathname: '/auth/login', state: { referrer: from } }}/>);
  }
}

export default Logout;
