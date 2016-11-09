import React from 'react';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { widgetWrapper } from 'helpers/widgetWrapper';
import { Button, Panel } from 'react-bootstrap';

class ContainerWidget extends React.Component {
  static displayName = 'ContainerWidget'

  change(event) {
    console.log(event.target.value);
    this.props.hold(event.target.value);
  }

  save() {
    this.props.save();
    const invalid = this.props.getDataInvalid();
    console.log('After saving, invalid:::', invalid);
  }

  render() {

    return (
      <Panel header="Editable Element">
        { this.props.children }
        <Button bsStyle="primary" bsSize="large" onClick={::this.save}>Save me</Button>
      </Panel>
    );
  }
}

export default widgetWrapper()(ContainerWidget);
