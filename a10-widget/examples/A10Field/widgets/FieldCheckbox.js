import React, { PropTypes } from 'react';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { widgetWrapper } from 'widgetWrapper';
import { FormGroup, ControlLabel, Col, Checkbox } from 'react-bootstrap';

class FieldCheckbox extends React.Component {
  static displayName = 'EditableCom'

  change(event) {
    // console.log(event.target.checked);
    this.props.modelHold(event.target.checked);
  }

  save() {
    this.props.modelSave();
    const invalid = this.props.modelGetDataInvalid();
    console.log('After saving, invalid:::', invalid);
  }

  render() {
    // console.log(this.props);
    const { label, value, checked, required, children } = this.props; // eslint-disable-line
    return (
      <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
          { label }
          { required && <span style={{ color: 'red' }}>&nbsp;*</span> }
        </Col>
        <Col sm={10}>
          <Checkbox style={{marginTop: 0}} onChange={::this.change} checked={this.props.activeData}  />
        </Col>
      </FormGroup>
    );
  }
}

export default widgetWrapper([ 'app' ])(FieldCheckbox, {
  meta: {
    widget: {
      iconClassName: 'fa fa-check-square-o',
      type: 'Field',
      name: 'FieldCheckbox',
      component: 'FieldCheckbox',
      description: ''
    },
    defaultProps: {
      label: 'My label',
      required: true
    },
    propTypes: {
      label: PropTypes.string,
      required: PropTypes.bool
    },
    propGroups: {
      label: 'basic',
      required: 'basic'
    },
    propValidations: {
      label: [ 'ipv6-address' ]
    },
    propDescriptions: {
      label: 'Just label',
      required: 'just required'
    }
  }
});
