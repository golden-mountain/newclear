import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, FormGroup, ButtonToolbar, ButtonGroup, Modal } from 'react-bootstrap';
import { APP_CURRENT_PAGE } from 'configs/appKeys';

export class A10FieldSubmit extends Component {

  render() {
    const { submitting, reset, pristine } = this.props;
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
                  <Button type="button" disabled={pristine || submitting} onClick={reset} >
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

class A10SuperButton extends Component {
  // context defined at page
  constructor(props, context) {
    super(props, context);
    this.parentProps = context.props;
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(this.modelVisible, 'modelVisible.............................');
  // }

  close() {
    this.parentProps.setPageVisible(this.props.pageName, false);
  }

  render() {
    const { children, popup, onClick, title, pageName } = this.props;
    this.modelVisible = this.props.app.getIn([ APP_CURRENT_PAGE, 'pages', this.props.pageName, 'visible' ], false);

    let popupContent = null, click = onClick;
    // console.log(popup);
    if (popup) {
      popupContent = React.createElement(popup, { visible: false });
      click = () => {
        // this.setState({ showPopup: true });
        this.parentProps.setPageVisible(pageName, true);
      };
    }

    return (
      <Button bsStyle="default" onClick={click}>{ children }
        <Modal show={this.modelVisible} onHide={::this.close}>
            <Modal.Header>
              <Modal.Title>{ title || children }</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {popupContent}
            </Modal.Body>

        </Modal>  
      </Button>      
    );
  }
}

A10SuperButton.contextTypes = {
  props: PropTypes.object
};

export const A10Button = connect(
  (state) => {
    return {
      app: state.getIn([ 'app' ])
    };
  }
)(A10SuperButton);
