import React, { Component } from 'react';
import { InputGroup } from 'react-bootstrap';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

// Then import the virtualized Select HOC
import VirtualizedSelect from 'react-virtualized-select';
import { A10Button } from 'components/Form/A10Button';

class A10Select extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = { };
  // }

  render() {
    // console.log(this.props, '...............this.props');
    const { value, onChange, popupInfo } = this.props;

    const options = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3, disabled: true }
      // And so on...
    ];


    return (
      popupInfo ? 
      <InputGroup>
        <VirtualizedSelect
          options={options}
          value={value}
          onChange={onChange}
        />
        <InputGroup.Addon>
          <A10Button popup={ popupInfo } componentClass="a">+</A10Button>
        </InputGroup.Addon>
      </InputGroup>
      :
      <VirtualizedSelect
        options={options}
        value={value}
        onChange={onChange}
      />
      
    );
  }
}


export default A10Select;
