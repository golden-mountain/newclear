import React, { Component, PropTypes } from 'react';

export default class AdcForm extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}
