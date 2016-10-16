import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
// import { APP_CURRENT_PAGE } from 'configs/appKeys';
import { getAppPageVar } from 'helpers/stateHelper';
import { widgetWrapper } from 'helpers/widgetWrapper';
// import { toPath, set } from 'lodash';
// import { fromJS, List } from 'immutable';
// import { axapiGet } from 'helpers/axapiHelper';
import FieldConnector from 'helpers/FieldConnector';
import { setPageVisible } from 'redux/modules/app/page';
import { change } from 'redux-form/immutable';
// import PageLayout from 'layouts/a10/PageLayout';

class A10Button extends Component {
  // context defined at page
  constructor(props, context) {
    super(props, context);
    //this._parentProps = context.props;
    this.modelVisible = false;
  }

  render() {
    const { page, env, app, form, children, dispatch, onClick, componentClass,  //eslint-disable-line
      popup: { pageClass, title,  connectOptions, pageName,
      urlKeysConnect,  ...modalProps }, ...rest } = this.props;

    // console.log('connect options:', connectOptions);
    let popupContent = null, click = onClick, modal = null;
    if (pageClass) {
      this.modelVisible = getAppPageVar(app, 'visible', pageName);
      // console.log(this.modelVisible, '..........................visible');
      const changeFormField = (name, value) => {
        dispatch(change(env.form, name, value));
      };

      popupContent = this.modelVisible
        ? React.createElement(pageClass, {
          visible: true,
          fieldConnector: new FieldConnector(connectOptions, form, env, changeFormField),
          urlKeysConnect
        })
        : null;
      click = () => {
        // this.setState({ showPopup: true });    
        // dispatch(registerCurrentPage(env.page, { page: pageName, form: pageName }));    
        dispatch(setPageVisible(env.page, pageName, true));
      };

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
    } else {
      modal = children;
    }

    return React.createElement( componentClass || Button, { onClick: click, ...rest }, modal);
  }
}

export default widgetWrapper(A10Button);
