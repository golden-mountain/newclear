import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, FormGroup, ButtonToolbar, ButtonGroup, Modal } from 'react-bootstrap';
// import { APP_CURRENT_PAGE } from 'configs/appKeys';
import { getAppPageVar } from 'helpers/stateHelper';
import { toPath, set } from 'lodash';
import { fromJS, List } from 'immutable';

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
  constructor(options, formData, contextProps) {
    this.options = options;
    this._formData = formData;
    this._contextProps = contextProps;
  }

  getOptions() {
    return this.options || {};
  }

  connectTo(connectTo, values) {
    let valuePath = [ this._contextProps.form, 'values' ];
    connectTo = fromJS(connectTo);
    connectTo.forEach((map, prefix) => {
      const formValue = this._formData.getIn(valuePath.concat(toPath(prefix)));
      let obj = formValue.toJS();
      
      if (List.isList(formValue)) {
        let newObj = {};

        // formValue.forEach((value) => {
        map.forEach((source, target) => {
          let v = values.getIn(toPath(source));
          if (v) {
            set(newObj, target, v);
          } 
        });             
        // });
        obj.push(newObj);
      } else {
        map.forEach((source, target) => {
          let v = values.getIn(toPath(source));
          if (v) {
            set(obj, target, v);
          }
        });
      }          
      // console.log('object value is...............', obj);
      this._contextProps.change(prefix, fromJS(obj));
    });
  }

  connectToValues(values) {
    let { connectToValue, onLoad } = this.options;
    // onLoad could connect to values once
    if (onLoad) {
      onLoad(values);
    }

    if (connectToValue) {
      this.connectTo(connectToValue, values);      
    }
    return values;
  }

  connectToResult(promise) {
    let { connectToResult, onLoad } = this.options;

    if (connectToResult) {
      promise.then((values) => {
        const newValues = values.pop().body;
        // values is axapi returned values
        this.connectTo(connectToResult, fromJS(newValues));
        // onLoad could connect to values once
        if (onLoad) {
          onLoad(newValues);        
        }
      });
    }
    
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
    const { app, form, children, dispatch, onClick, componentClass,  //eslint-disable-line
      popup: { pageClass, title, pageName, connectOptions, 
      urlKeysConnect,  ...modalProps }, ...rest } = this.props; 

    let popupContent = null, click = onClick;
    if (pageClass) {
      popupContent = React.createElement(pageClass, { visible: true , 
        fieldConnector: new FieldConnector(connectOptions, form, this._parentProps), urlKeysConnect });
      this.modelVisible = getAppPageVar(app, 'visible', pageName);
      // console.log(this.modelVisible, '..........................visible');

      click = () => {
        // this.setState({ showPopup: true });
        this._parentProps.setPageVisible(pageName, true);
      };
    }

    const modal = (
      <span>{children}
        <Modal show={this.modelVisible}  {...modalProps}>
            <Modal.Header>
              <Modal.Title>{ title || children }</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {popupContent}
            </Modal.Body>

        </Modal>        
      </span>
    );

    return React.createElement( componentClass || Button, { onClick: click, ...rest }, modal);
  }
}

A10SuperButton.contextTypes = {
  props: PropTypes.object
};

export const A10Button = connect(
  (state) => {
    return {
      app: state.getIn([ 'app' ]),
      form: state.getIn( [ 'form' ])
    };
  }
)(A10SuperButton);
