import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';

import './assets/a10muti_value.scss';

export class A10TagInput extends Component {

  static displayName = 'A10TagInput'

  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
  }

  handleChange = (tags) => {
    this.setState({ tags });
  }

  render() {
    return (
      <TagsInput value={this.state.tags} 
          onChange={this.handleChange} 
          inputProps={{
            className: 'react-tagsinput-input',
            placeholder: 'Try me'
          }} />
    );
  }

}
