import React, { Component, PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getComponentVar } from 'helpers/stateHelper';
import { widgetWrapper } from 'helpers/widgetWrapper';
import FieldConnector from 'helpers/FieldConnector';
// import { setComponentVisible } from 'redux/modules/app/component';
// import { change } from 'redux-form/immutable';
import invariant from 'invariant';

class A10Button extends Component {
  static displayName = 'A10Button'
  static contextTypes = {
    props: PropTypes.object.isRequired
  }

  // context defined at page
  constructor(props, context) {
    super(props, context);
    //this._parentProps = context.props;
    this.modelVisible = false;
  }

  render() {
    /* eslint-disable no-unused-vars */
    const { env, app, form, children, onClick, componentClass,
      popup: { id, pageClass, title,  connectOptions, pageName,
      urlKeysConnect,  ...modalProps }, attrs } = this.props;
    /* eslint-enable no-unused-vars */

    let popupContent = null, click = onClick, modal = null;
    if (pageClass) {
      invariant(pageClass.displayName, `Popup component for Page ${env.page} must have static property displayName and componentId`);
      this.modelVisible = getComponentVar(app, env.page, env.pageId, pageClass.displayName, pageClass.componentId, 'visible');
      click = () => {
        // this.setState({ showPopup: true });
        // dispatch(registerCurrentPage(env.page, { page: pageName, form: pageName }));
        this.context.props.setComponentVisible(env.pageId, pageClass.displayName, pageClass.componentId, true);
        return false;
      };
      if (!this.modelVisible) {
        modal = children;
        // console.log('show button itself without modal');
      } else {
        // console.log('this model visible', id, this.modelVisible);
        const changeFormField = (name, value) => {
          this.context.props.change(env.form, name, value);
        };

        // console.log(pageClass.displayName, pageClass.componentId);
        // console.log('debug field connector ', FieldConnector);
        popupContent = React.createElement(pageClass, {
          visible: true,
          fieldConnector: new FieldConnector(connectOptions, form, env, changeFormField),
          // pageId: id,
          componentName: pageClass.displayName,
          componentId: pageClass.componentId,
          urlKeysConnect
        });

        modal = (
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
      }
    } else {
      modal = children;
    }

    let buttonStyle = {
      cursor: 'pointer'
    };

    return React.createElement( componentClass || Button, { onClick: click, style: buttonStyle, ...attrs }, modal);
  }
}

export default widgetWrapper(A10Button);
