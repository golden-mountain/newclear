import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, FormGroup, ButtonToolbar, ButtonGroup, Modal } from 'react-bootstrap';
// import { APP_CURRENT_PAGE } from 'configs/appKeys';
import { getAppPageVar } from 'helpers/stateHelper';

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
    this.modelVisible = false;
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(this.modelVisible, 'modelVisible.............................');
  // }

  close() {
    this.parentProps.setPageVisible(this.props.popup.pageName, false);
  }

  render() {
    const { children,  onClick, popup: { pageClass, title, pageName, ...modalProps }, ...rest } = this.props; 

    let popupContent = null, click = onClick;
    if (pageClass) {
      popupContent = React.createElement(pageClass, { visible: false });
      this.modelVisible = getAppPageVar(this.props.app, 'visible', pageName);
      // console.log(this.modelVisible, '..........................visible');

      click = () => {
        // this.setState({ showPopup: true });
        this.parentProps.setPageVisible(this.props.popup.pageName, true);
      };
    }

    return (
      <Button onClick={click} {...rest}>{ children }
        <Modal show={this.modelVisible} onHide={::this.close} {...modalProps}>
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
