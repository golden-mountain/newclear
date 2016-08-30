import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';

import { Field, actions, controls, createFieldClass } from 'react-redux-form';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, Col, Row, Radio, Checkbox } from 'react-bootstrap';

import _ from 'lodash';
import * as viewActions from 'redux/modules/fieldViewReducer';


const RadioField = createFieldClass({
  'Radio': controls.radio
}, {
  componentMap: {
    Radio: Radio
  }
});

const CheckboxField = createFieldClass({
  'Checkbox': controls.checkbox
}, {
  componentMap: {
    Checkbox: Checkbox
  }
});

class A10FieldLayout extends Component {

  render() {
    const { label } = this.props;
    // console.log(this.props);
    // const children = React.cloneElement(this.props.children);
    return (
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>{label}</Col>
          <Col sm={10}>
              { this.props.children }
          </Col>
        </FormGroup>  
    );
  }
}

class A10Field extends Component {

  // shouldComponentUpdate () {
  //   this.visible(this.props.model, this.props.conditional);
  //   return true;
  // }

  visible(model, conditional) {
    let visible = true;
    _.forIn(conditional, (v, m) => {     
      visible = _.get(this.props, m, undefined) === v;      
      // this.props.viewEdit(model, {visible});
    });
    return visible;
  }

  render() {
    const { label, model, type, conditional, fieldView } = this.props;
    // const children = React.cloneElement(this.props.children);
    // const visible = fieldView.getIn(model.split('.'), true);
    const visible = this.visible(model, conditional);
    const fieldMap = {
      radio: RadioField,
      checkbox: CheckboxField
    }

    let field = fieldMap[type];
    if (!field) {
      field = Field;
    }
    const fieldProps = { 
      model: model
    };
    const fieldElement = React.createElement(field, fieldProps, this.props.children);
    return (
      visible && 
      <A10FieldLayout {...{label}} >
        { fieldElement }
      </A10FieldLayout>
    );
  }
}


// function mapDispatchToProps(dispatch, ownProps) {
//     return Object.assign(
//         {},
//         // ownProps,
//         bindActionCreators(viewActions, dispatch),
//         // bindActionCreators(actions, dispatch),
//         // bindActionCreators(appActions, dispatch)
//     );
// }

export default connect(s=>s)(A10Field);