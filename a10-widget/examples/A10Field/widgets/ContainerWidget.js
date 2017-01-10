import React, { PropTypes } from 'react';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { widgetWrapper } from 'widgetWrapper';
import { Button, Panel } from 'react-bootstrap';

class ContainerWidget extends React.Component {
  static displayName = 'ContainerWidget'

  change(event) {
    console.log(event.target.value);
    this.props.modelHold(event.target.value);
  }

  save() {
    this.props.modelSave();
    const invalid = this.props.modelGetDataInvalid();
    console.log('After saving, invalid:::', invalid);
  }

  initialize() {
    this.props.reset();
    const invalid = this.props.modelGetDataInvalid();
    console.log('reinitialized...', invalid);
  }

  render() {

    return (
      <Panel header="Editable Element">
        { this.props.children }
        <Button bsStyle="primary" bsSize="large" onClick={::this.save}>Save me</Button>
        <Button bsStyle="default" bsSize="large" onClick={::this.initialize}>Reset</Button>
      </Panel>
    );
  }
}

export default widgetWrapper()(ContainerWidget);
