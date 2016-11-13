import React, { Component } from 'react';
import { FormGroup, Checkbox } from 'react-bootstrap';

// import { widgetWrapper } from 'helpers/widgetWrapper';

export default class A10Checkboxs extends Component {
  static displayName = 'A10Checkboxs'

  render() {
    const { options, change } = this.props;

    // console.log(value);

    return (
      <FormGroup>
      {
        options.map(({ label, value:optionValue }, index) => {
          return (
            <Checkbox key={index} value={optionValue} name={name} onChange={change} inline>
            {label.replace('"', '')}
            </Checkbox>
          );
        })
      }
      </FormGroup>
    );
    
  }
}

// export default widgetWrapper()(A10Checkboxs);
