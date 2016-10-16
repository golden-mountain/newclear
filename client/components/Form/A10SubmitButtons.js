import React, { Component, PropTypes } from 'react';
import { Button, Row, Col, FormGroup, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
// import { setLastPageVisible } from '';

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

  // context defined at page
  constructor(props, context) {
    super(props, context);
    this._parentProps = context.props;
  }

  close() {
    // const { env, dispatch,  } = this.props;
    this.context.props.setLastPageVisible(false);
  }

  render() {
    const { buttons=[ 'create', 'cancel' ] } = this.props;
    return (
      <Row>
        <Col xs={12}>
          <FormGroup>
            <Col className="pull-right">
              <ButtonToolbar>
                <ButtonGroup bsSize="large">
                  {
                    buttons.map((name, index) =>{
                      return this.buttons[name](this.props, index);
                    })
                  }
                </ButtonGroup>
              </ButtonToolbar>
              </Col>
          </FormGroup>
        </Col>
      </Row>
    );
  }
}

A10SubmitButtons.contextTypes = {
  props: PropTypes.object
};

export default A10SubmitButtons;
