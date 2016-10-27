import React, { Component, PropTypes } from 'react';
import { Button, FormGroup, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
// import { setLastPageVisible } from '';
import { HIDE_COMPONENT_MODAL } from 'configs/messages';

export class A10SubmitButtons extends Component {
  buttons = {
    create: ({ submitting }, index) => {
      return (
        <Button type="submit" disabled={submitting} bsStyle="success" key={index}>
          {submitting ? <i/> : <i/>} Create
       </Button>
      );
    },
    cancel: ({ pristine, submitting }, index) => {
      return (
        <Button type="button" disabled={pristine || submitting} onClick={::this.close} key={index} >
          Cancel
        </Button>
      );
    },
    reset: ({ pristine, submitting }, index) => {
      return (
        <Button type="button" disabled={pristine || submitting} onClick={::this.close} key={index} >
          Reset
        </Button>
      );
    },
    login: ({ submitting }, index) => {
      return (
        <Button type="submit" disabled={submitting} bsStyle="success" key={index}>
          {submitting ? <i/> : <i/>} Login
       </Button>
      );
    }
  };

  static contextTypes = {
    props: PropTypes.object
  }

  close() {
    console.log('Close ... ', this.props.instancePath);
    this.props.kickBall(HIDE_COMPONENT_MODAL, null, this.props.instancePath);
  }

  render() {
    const { buttons=[ 'create', 'cancel' ] } = this.props;
    const style = {
      marginRight: '15px'
    };
    return (

      <FormGroup>
          <ButtonToolbar>
            <ButtonGroup bsSize="large" className="pull-right" style={style}>
              {
                buttons.map((name, index) =>{
                  return this.buttons[name](this.props, index);
                })
              }
            </ButtonGroup>
          </ButtonToolbar>
      </FormGroup>

    );
  }
}

export default A10SubmitButtons;
