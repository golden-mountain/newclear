import React, { Component } from 'react';
import { FormGroup, Radio } from 'react-bootstrap';

// import { widgetWrapper } from 'helpers/widgetWrapper';

export class A10Radios extends Component {
  static displayName = 'A10Radios'

  render() {
    const { options, name, onChange } = this.props;
    // console.log(this.props);

    return (
      <FormGroup>
      {
        options.map((option, index) => {
          const [ optionValue, label ] = Object.entries(option).pop();
          // console.log(option, value, label);
          return (
            <Radio key={index} value={optionValue} name={name} onChange={onChange} inline>
            {label.replace('"', '')}
            </Radio>
          );
        })
      }
      </FormGroup>
    );

  }
}

// export default widgetWrapper()(A10Radios);
