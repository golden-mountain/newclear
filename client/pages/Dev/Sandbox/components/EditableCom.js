import React from 'react';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { widgetWrapper } from 'helpers/widgetWrapper';
import { FormControl, FormGroup, ControlLabel, Col, Button, HelpBlock } from 'react-bootstrap';

class EditableCom extends React.Component {
  static displayName = 'EditableCom'

  change(event) {
    // console.log(event.target.value);
    this.props.modelHold(event.target.value);
  }

  save() {
    this.props.modelSave();
    const invalid = this.props.modelGetDataInvalid();
    console.log('After saving, invalid:::', invalid);
  }

  render() {
    // console.log(this.props);
    const { title, invalid:readonly, instanceData: { errorMsg } } = this.props;
    return (
      <FormGroup>
        <Col componentClass={ControlLabel}  sm={2} title={title}>{title}</Col>
        <Col sm={6}>
          <FormControl type="text" placeholder="Test Input" onChange={::this.change} value={this.props.activeData} readOnly={readonly}/>
          <FormControl.Feedback />
        </Col>
        <Col sm={4}>
          <Button bsStyle="default" bsSize="large" onClick={::this.save}>Apply</Button>
          <HelpBlock className="error">{errorMsg}</HelpBlock>

        </Col>
      </FormGroup>
    );
  }
}

export default widgetWrapper([ 'app' ])(EditableCom);
