import React, { PropTypes } from 'react';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { widgetWrapper } from 'widgetWrapper';
import { FormControl, FormGroup, ControlLabel, Row, Col, Button, HelpBlock } from 'react-bootstrap';

class EditableCom extends React.Component {
  static displayName = 'EditableCom';
  static defaultProps = {
    title: 'My title',
    invalid: true
  };
  static propTypes = {
    title: PropTypes.string,
    invalid: PropTypes.bool
  };

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
    const { 
      title, 
      invalid:readonly, 
      instanceData: { errorMsg }, 
      style,
      className
    } = this.props;

    return (
      <FormGroup style={style} className={className}>
        {this.props.children} 
        <Row>
          <Col componentClass={ControlLabel}  sm={2} title={title}>{title}</Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="Test Input" onChange={::this.change} value={this.props.activeData} readOnly={readonly}/>
            <FormControl.Feedback />
          </Col>
          <Col sm={4}>
            <Button bsStyle="default" bsSize="large" onClick={::this.save}>Apply</Button>
            <HelpBlock className="error">{errorMsg}</HelpBlock>
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

export default widgetWrapper([ 'app' ])(EditableCom, {
  meta: {
    widget: {
      iconClassName: 'fa fa-square-o',
      type: 'basic',
      name: 'EditableCom',
      component: 'EditableCom',
      description: ''
    },
    defaultProps: EditableCom.defaultProps,
    propTypes: EditableCom.propTypes,
    propGroups: {
      title: 'basic',
      invalid: 'advanced'
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
