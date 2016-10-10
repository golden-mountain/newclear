import React, { Component, PropTypes } from 'react';
import { Button, Row, Col, FormGroup, ButtonToolbar, ButtonGroup } from 'react-bootstrap';

export class A10SubmitButtons extends Component {
  // context defined at page
  constructor(props, context) {
    super(props, context);
    this._parentProps = context.props;
  }

  render() {
    const { submitting, reset, pristine } = this.props;

    const close = () => {
      reset();
      this._parentProps.setLastPageVisible(false);
    };

    return (
      <Row>
        <Col xs={12}>
          <FormGroup>
            <Col className="pull-right">
              <ButtonToolbar>
                <ButtonGroup bsSize="large">
                  <Button type="submit" disabled={submitting} bsStyle="success">
                    {submitting ? <i/> : <i/>} Create
                  </Button>
                  <Button type="button" disabled={pristine || submitting} onClick={close} >
                    Cancel
                  </Button>
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

