import _ from 'lodash';
import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Col } from 'react-bootstrap';

export default class FieldGroup extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
    pattern: PropTypes.string,
    typeMismatchErrorMessage: PropTypes.string,
    requiredErrorMessage: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      validationState: null
    };
  }

  onBlur = (event) => {
    console.log(this.input.checkValidity());
    var thisInput = this.input;
    console.log(thisInput.pattern);
    this.setState({
      validationState: this.input.checkValidity() ? 'success' : 'error',
      validationFailedByRequired: !this.input.checkValidity() && this.props.required && !event.target.value
    });
  }

  onFocus = () => {
    this.setState({
      validationState: null
    });
  }

  onChange= _.throttle((event) => {
    if (event.target.value && this.input.checkValidity()) {
      this.setState({
        validationState: 'success'
      });
    } else {
      this.setState({
        validationState: null
      });
    }
  }, 100)

  render() {
    const {
      label,
      required,
      type,
      pattern,
      typeMismatchErrorMessage,
      requiredErrorMessage
    } = this.props;

    const {
      validationFailedByRequired,
      validationState
    } = this.state;

    return (
      <FormGroup {...this.props} validationState={validationState}>
        <Col componentClass={ControlLabel} sm={2}>
          {label}
          { required && <span style={{ color: 'red' }}>&nbsp;*</span> }
        </Col>
        <Col sm={10}>
          <FormControl
            inputRef={ref => { this.input = ref; }}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onChange={this.onChange}
            type={type}
            required={required}
            pattern={pattern} />
          <FormControl.Feedback />
          {
            validationState === 'error' && (
              <HelpBlock>
                { validationFailedByRequired ? requiredErrorMessage : typeMismatchErrorMessage }
              </HelpBlock>
            )
          }
        </Col>
      </FormGroup>
    );
  }
}
