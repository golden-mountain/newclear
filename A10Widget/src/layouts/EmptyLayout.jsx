import React, { Component } from 'react';

export default class EmptyLayout extends Component {
  
  render() {
    return (
      <main className="main-app">
        
        {this.props.children}
        
      </main>
    );
  }
}

