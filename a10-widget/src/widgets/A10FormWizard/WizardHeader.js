import React, { Component, PropTypes } from 'react';

export default class WizardHeader extends Component {
  static displayName = 'WizardHeader'

  render() {
    return (<h4>{ this.props.text}</h4>);
  }
}
