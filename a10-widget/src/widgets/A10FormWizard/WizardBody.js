import React, { Component, PropTypes } from 'react';

export default class WizardBody extends Component {
  static displayName = 'WizardBody'

  render() {
    return (
      <fieldset>
        { this.props.children }
      </fieldset>
    );
  }
}
