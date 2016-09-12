import React, { Component, PropTypes } from 'react';
import auth from 'helpers/auth';

import Toolbar from 'components/Toolbar';
import './style.scss';

class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: auth.loggedIn()
    };
  }

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: !!loggedIn
    });
  }

  componentWillMount() {
    auth.onChange = this.updateAuth.bind(this);
    auth.login();
  }

  render() {
    return (
      <main className="main-app">
        <Toolbar />
        {this.props.children}
      </main>
    );
  }
}


export default App;
