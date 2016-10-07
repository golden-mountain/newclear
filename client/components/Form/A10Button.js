import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, FormGroup, ButtonToolbar, ButtonGroup, Modal } from 'react-bootstrap';
// import { APP_CURRENT_PAGE } from 'configs/appKeys';
import { getAppPageVar } from 'helpers/stateHelper';

export class A10FieldSubmit extends Component {
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

A10FieldSubmit.contextTypes = {
  props: PropTypes.object
};

class FieldConnector {
  constructor(options) {
    this.options = options;
  }

  getOptions() {
    return this.options || {};
  }

  connectToValues(values) {
    const { field, map } = this.options;
    console.log('field:', field, 'map:', map, 'values:', values);
    return values;
  }

  connectToResult(promise) {
    // if (!this.options.connectToValue) {

    // }
    console.log(promise, ' result connected from Form');
    return promise;
  }

  connectToApiStore(apiData) {
    let result = [];
    apiData.forEach((data) => {
      data.forEach((req) => {
        result.push(req.toJS());
      });
    });

    return result;
  }
}


class A10SuperButton extends Component {
  // context defined at page
  constructor(props, context) {
    super(props, context);
    this._parentProps = context.props;
    this.modelVisible = false;
  }

  // componentWillReceiveProps(nextProps) {
  //   // const pageVisible = getAppPageVar(nextProps.app, 'visible');
  //   console.log(pageVisible, 'modelVisible.............................');
  // }

  // close() {
  //   this._parentProps.setPageVisible(this.props.popup.pageName, false);
  // }

  render() {
    const { app, dispatch, children,  onClick, popup: { pageClass, title, pageName, connectOptions, urlKeysConnect,  ...modalProps }, ...rest } = this.props;  //eslint-disable-line

    let popupContent = null, click = onClick;
    if (pageClass) {
      popupContent = React.createElement(pageClass, { visible: true , fieldConnector: new FieldConnector(connectOptions), urlKeysConnect });
      this.modelVisible = getAppPageVar(this.props.app, 'visible', pageName);
      // console.log(this.modelVisible, '..........................visible');

      click = () => {
        // this.setState({ showPopup: true });
        this._parentProps.setPageVisible(pageName, true);
      };
    }

    return (
      <Button onClick={click} {...rest}>{ children }
        <Modal show={this.modelVisible}  {...modalProps}>
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
