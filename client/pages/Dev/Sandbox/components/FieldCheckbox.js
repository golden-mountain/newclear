import React from 'react';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { widgetWrapper } from 'helpers/widgetWrapper';
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
    const { title, value, checked } = this.props; // eslint-disable-line
    return (
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            {title || 'Empty Title'}
          </Col>
          <Col sm={10}>
            <Checkbox onChange={::this.change} checked={this.props.activeData}  />
          </Col>
        </FormGroup>
    );
  }
}

export default widgetWrapper([ 'app' ])(FieldCheckbox);
