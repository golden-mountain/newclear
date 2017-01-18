import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TagsInput from 'react-tagsinput';

import './assets/a10taginput.scss';

export class A10TagInput extends Component {

  static displayName = 'A10TagInput'

  static propTypes = {
    values: PropTypes.array,
    onChange: PropTypes.func,
    onChangeInput: PropTypes.func,
    validationRegex: PropTypes.any,
    maxTags: PropTypes.number,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    onlyUnique: PropTypes.bool,
    onClickInput: PropTypes.func,
    onBlur: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
  }

  handleChange = (tags) => {
    this.props.onChange ? this.props.onChange(tags) : this.setState({ tags });
  }

  handleClick = (e) => {
    const { onClickInput } = this.props;
    const { target } = e;
    if (target && (target.className.indexOf('react-tagsinput-input') >= 0 || target.className.length === 0)) {
      if (target.className.length === 0) {
        this.refs.taginput.focus();
      }
      if (onClickInput) {
        e.preventDefault();
        onClickInput(ReactDOM.findDOMNode(this.refs.taginput));
      }
    }
  }

  renderLayout = (tagComponents, inputComponent) => {
    const { onBlur } = this.props;
    return (
      <div onClick={this.handleClick}>
        {tagComponents}
        {
          React.cloneElement(inputComponent, { onBlur })
        }
      </div>
    );
  }

  addTag = val => {
    this.refs.taginput.addTag(val);
  }

  render() {
    const { values, placeholder, disabled, onChangeInput, validationRegex, maxTags, onlyUnique } = this.props;
    return (
      <TagsInput ref="taginput"
          value={values || this.state.tags} 
          onChange={this.handleChange} 
          onChangeInput={onChangeInput}
          disabled={disabled || false}
          validationRegex={validationRegex}
          maxTags={maxTags || -1}
          onlyUnique={onlyUnique || true}
          inputProps={{
            className: 'react-tagsinput-input',
            placeholder: placeholder || 'Please Input Somethings'
          }} 
          renderLayout={this.renderLayout} />
    );
  }

}
