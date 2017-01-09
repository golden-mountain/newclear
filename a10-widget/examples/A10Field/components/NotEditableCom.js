import React, { PropTypes } from 'react';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { widgetWrapper } from 'widgetWrapper';
// import { Panel } from 'react-bootstrap';


class NotEditableCom extends React.Component {
  static displayName = 'NotEditableCom'
  static contextTypes = {
    wm: PropTypes.object
  }

  click(event) {
    event.preventDefault();
    console.log('clicking... set ip address to ::9999');
    this.props.modelHold('::9999');
    // this.context.cm.printComponentTree(true);

    // const meta = this.props.modelGetMeta();
    // const model = this.props.modelGetModel();
    // this.props.setDataInvalid();
    // let invalid = this.props.modelGetDataInvalid();
    // // this.setState({ ip: '::8999' });
    // console.log(' model:::', model, ' meta:::', meta, ' value:::', value, ' invalid:::', invalid);
    // this.props.setDataValid();
    // invalid = this.props.modelGetDataInvalid();
    // console.log('Invalid:::', invalid);
    //
    // this.props.modelSave();
    // invalid = this.props.modelGetDataInvalid();
    // console.log('After saving, invalid:::', invalid);
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <h5>Static Component</h5>
        <a href="#" onClick={::this.click}>Set Value</a>
        <p>{ this.props.activeData }</p>
      </div>
    );
  }
}



export default Object.assign(widgetWrapper([ 'app' ])(NotEditableCom), { 
  editableProps : { 
    title: PropTypes.string,
    number: PropTypes.number,
    answer: PropTypes.bool
  }
});
