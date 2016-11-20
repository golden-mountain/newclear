import React, { Component } from 'react';

export default class EmptyLayout extends Component {
  
  render() {
    console.log('render at EmptyLayout');
    return (
      <main className="main-app">
        
        {this.props.children}
        
      </main>
    );
  }
}

