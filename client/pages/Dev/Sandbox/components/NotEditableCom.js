import React from 'react';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { widgetWrapper } from 'helpers/widgetWrapper';
import { Panel } from 'react-bootstrap';


class NotEditableCom extends React.Component {
  static displayName = 'NotEditableCom'

  click() {
    console.log('clicking... set ip address to ::9999');
    this.props.hold({ 'ipv6-address': '::9999' });
    const value = this.props.getValue();
    const meta = this.props.getMeta();
    const model = this.props.getModel();
    this.props.setDataInvalid();
    let invalid = this.props.getDataInvalid();
    // this.setState({ ip: '::8999' });
    console.log(' model:::', model, ' meta:::', meta, ' value:::', value, ' invalid:::', invalid);
    this.props.setDataValid();
    invalid = this.props.getDataInvalid();
    console.log('Invalid:::', invalid);

    this.props.save();
    invalid = this.props.getDataInvalid();
    console.log('After saving, invalid:::', invalid);
  }

  render() {

    return (
      <Panel header="Static Component">
        hi, I am a list, but I have values <a href="#" onClick={::this.click}>Set Value</a>
        <p>{ this.props.getValue() || 'not set' }</p>
      </Panel>
    );
  }
}

export default widgetWrapper()(NotEditableCom);
