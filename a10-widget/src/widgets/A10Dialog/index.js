import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { is, List } from 'immutable';

import ModalLayout from '../../layouts/ModalLayout';
// import Dialogs from 'dialogs';

class _A10DialogFactory extends Component {

  static propTypes = {
    dialogs: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.instancePath = [ 'app', 'global', 'dialog' ];
    this.state = {
      Component: null,
      title: null, 
      bsSize: null,
      options: null
    };
  }

  loadDialogContent() {
    const {
      props: { app, dialogs },
      instancePath  
    } = this;
    const dialogStack = app && app.getIn(instancePath, List());

    if (dialogStack.size > 0) {
      const {
        name,
        title,
        bsSize,
        options
      } = dialogStack.get(dialogStack.size - 1);
      this.setState({ Component: dialogs[name], title, bsSize, options });
    } else {
      this.setState({
        Component: null,
        title: null,
        bsSize: null,
        options: null
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      props: { app },
      instancePath
    } = this;

    if (prevProps.app && app) {
      const prevDialogStack = prevProps.app.getIn(instancePath, List());
      const dialogStack = app.getIn(instancePath, List());
      if (!is(prevDialogStack, dialogStack) || prevDialogStack.size !== dialogStack.size) {
        this.loadDialogContent();
      }
    }
  }

  componentDidMount() {
    this.loadDialogContent();
  }

  render() {
    const { 
      Component,
      title,
      bsSize,
      options={}
    } = this.state;

    if (!Component) return null;

    const { create, cancel } = options;
    return (
      <ModalLayout visible={true} title={title} bsSize={bsSize}>
        <Component actions={{ create, cancel }} />
      </ModalLayout>
    );
  }

}

function mapStateToProps(state) {
  return {
    app: state
  };
}

function mapDispatchToProps() {
  return {};
}

export const A10DialogFactory = connect(mapStateToProps, mapDispatchToProps)(_A10DialogFactory);
