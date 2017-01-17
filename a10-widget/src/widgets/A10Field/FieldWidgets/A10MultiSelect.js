import React, { Component, PropTypes } from 'react';

import VirtualizedSelect from 'react-virtualized-select';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

export class A10MultiSelect extends Component {

  static displayName = 'A10MultiSelect'

  static defaultProps = {
    options: [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3, disabled: true }
      // And so on...
    ]
  }

  static propTypes = {
    options: PropTypes.array.isRequired,
    searchable: PropTypes.bool,
    clearable: PropTypes.bool,
    autofocus: PropTypes.bool,
    value: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <VirtualizedSelect options={this.props.options}
        searchable={true}
        clearable={true}
        autofocus={true}
        multi={true}
        onChange={(selectValue) => this.setState({ selectValue })}
        value={this.state.selectValue}/>
    );
  }

}

// import { A10TagInput } from './A10TagInput';
// import './assets/a10multiselect.scss';

// export class A10MultiSelect extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       selector: {
//         display: 'none'
//       }
//     };
//   }

//   renderSelect = target => {
//     const { width } = target.getBoundingClientRect();
//     this.setState({
//       selector: {
//         display: 'block',
//         width: `${width}px`
//       }
//     });
//   }

//   handleBlur = () => {
//     setTimeout(() => {
//       this.setState({
//         selector: {
//           display: 'none'
//         }
//       });
//     }, 200);
//   }

//   add = (value) => {
//     this.refs.a10taginput.addTag(value);
//     // console.log(this.refs.a10taginput.taginput, value);
//   }

//   render() {
//     return (
//       <div className="multi-select" style={this.state.container}>
//         <A10TagInput ref="a10taginput" onClickInput={this.renderSelect} onBlur={this.handleBlur} />
//         <div ref="selector" className="selector" style={this.state.selector}>
//           <ul>
//             <li onClick={this.add.bind(this, 1)}>123</li>
//             <li onClick={this.add.bind(this, 2)}>456</li>
//             <li onClick={this.add.bind(this, 3)}>789</li>
//           </ul>
//         </div>
//       </div>
//     );
//   }

// }
