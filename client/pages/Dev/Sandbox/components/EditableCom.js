import React from 'react';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { widgetWrapper } from 'helpers/widgetWrapper';
import { FormControl, FormGroup, ControlLabel, Col, Button, Panel } from 'react-bootstrap';

class EditableCom extends React.Component {
  static displayName = 'EditableCom'

  change(event) {
    console.log(event.target.value);
    this.props.hold({ 'name': event.target.value });
  }

  save() {
    this.props.save();
    const invalid = this.props.getDataInvalid();
    console.log('After saving, invalid:::', invalid);
  }

  render() {

    return (
      <Panel header="Editable Element">
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Test Field
          </Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="Test Input" onChange={::this.change}/>
          </Col>
        </FormGroup>
        <Button bsStyle="primary" bsSize="large" onClick={::this.save}>Save me</Button>
      </Panel>
    );
  }
}

export default widgetWrapper()(EditableCom);
