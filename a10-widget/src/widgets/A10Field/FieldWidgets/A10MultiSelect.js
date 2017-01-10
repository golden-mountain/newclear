import React, { Component } from 'react';

import { A10TagInput } from './A10TagInput';
import './assets/a10multiselect.scss';

export class A10MultiSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selector: {
        display: 'none'
      }
    };
  }

  renderSelect = target => {
    const { width } = target.getBoundingClientRect();
    this.setState({
      selector: {
        display: 'block',
        width: `${width}px`
      }
    });
  }

  handleBlur = () => {
    setTimeout(() => {
      this.setState({
        selector: {
          display: 'none'
        }
      });
    }, 200);
  }

  add = (value) => {
    this.refs.a10taginput.addTag(value);
    // console.log(this.refs.a10taginput.taginput, value);
  }

  render() {
    return (
      <div className="multi-select" style={this.state.container}>
        <A10TagInput ref="a10taginput" onClickInput={this.renderSelect} onBlur={this.handleBlur} />
        <div ref="selector" className="selector" style={this.state.selector}>
          <ul>
            <li onClick={this.add.bind(this, 1)}>123</li>
            <li onClick={this.add.bind(this, 2)}>456</li>
            <li onClick={this.add.bind(this, 3)}>789</li>
          </ul>
        </div>
      </div>
    );
  }

}
