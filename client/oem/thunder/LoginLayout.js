import React, { Component } from 'react';

export default class LoginLayout extends Component {

  render() {
    return (
      <main className="login-page">
        {this.props.children}      
      </main>
    );
  }
}
