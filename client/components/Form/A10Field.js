import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Col, HelpBlock } from 'react-bootstrap';

class A10FieldLayout extends Component {
  render() {
    const { label, meta: { touched, error }, children } = this.props;
    let status = {}, errorMsg = '';

    if (touched && error) {
      errorMsg = <HelpBlock className="error">{error}</HelpBlock>;
      status.validationState = 'error';
    }

    return (
      <FormGroup {...status}>
        <Col componentClass={ControlLabel} sm={2}>{label}</Col>
        <Col sm={10}>
          {children}
          <FormControl.Feedback />
          { errorMsg }
        </Col>
      </FormGroup>
    );
  }  
}

// multiple options input
const registeredMVInputs = [ 'Checkbox', 'Radio' ];

export class A10Field extends Component {

  render() {
    const { children, input, ...fieldOptions } = this.props;
    return (
      <A10FieldLayout {...fieldOptions}>
        {
          React.Children.map(children, (child) => {
            let inputOptions = {

            };

            const { value, ...restInput } = input;
            // only support React Bootstrap
            if (~registeredMVInputs.indexOf(child.type.name)) {              
              inputOptions['checked'] = child.props.value === value;
            } else {
              inputOptions['value'] = value;
            }
            return  React.cloneElement(child, { ...inputOptions, ...restInput });
          })
        }
      </A10FieldLayout>
    );
  }
}

