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
    const { title, value, checked, children } = this.props; // eslint-disable-line
    return (
      <div style={{ position: 'relative' }}>
        { children }
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            {title || 'Empty Title'}
          </Col>
          <Col sm={10}>
            <Checkbox onChange={::this.change} checked={this.props.activeData}  />
          </Col>
        </FormGroup>
      </div>
    );
  }
}

export default widgetWrapper([ 'app' ])(FieldCheckbox, {
  meta: {
    widget: {
      iconClassName: 'fa fa-square-o',
      type: 'basic',
      name: 'FieldCheckbox',
      component: 'FieldCheckbox',
      description: ''
    },
    defaultProps: {
      title: 'My title',
      invalid: true
    },
    propTypes: {
      title: PropTypes.string,
      invalid: PropTypes.bool
    },
    propGroups: {
      title: 'basic',
      invalid: 'basic'
    },
    propValidations: {
      title: [ 'ipv6-address' ]
    },
    propDescriptions: {
      title: 'Just title',
      invalid: 'just invalid'
    }
  }
});
