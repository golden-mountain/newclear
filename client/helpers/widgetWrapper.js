import React, { Component } from 'react'; //PropTypes
import { connect } from 'react-redux';
import hoistStatics from 'hoist-non-react-statics';
import { getAppPageVar, getAppEnvVar } from './stateHelper';

// wrapper for widgets, add a wrapper to get state
export function widgetWrapper(WrappedComponent, ...widgetProps) {

  class Widget extends Component {
    constructor(props, context) {
      super(props, context);
      this.widgetProps = widgetProps;     
      // this.actions = this.createActions(); 
    }

    // createActions() {
    //   const { env: { page }, dispatch } = this.props;
    //   const bindPage = actionCreator => actionCreator.bind(null, page);
    //   const bindActions = mapValues(widgetActions, bindPage);   
    //   return bindActionCreators(bindActions, dispatch);
    // }

    // getChildContext() {
    //   return { actions: this.actions };
    // }

    render() {
      this.renderedElement = React.createElement(WrappedComponent, Object.assign(this.props, this.widgetProps));
      return this.renderedElement; 
    }
  }

  // Widget.childContextTypes = {
  //   actions: PropTypes.object
  // };

  const stateMapper = (state) => {
    return {
      env: getAppEnvVar(state),
      page: getAppPageVar(state),
      app: state.getIn([ 'app' ]),
      form: state.getIn( [ 'form' ])      
    };
  };


  let newComponent = connect(stateMapper)(Widget);
  return hoistStatics(newComponent, WrappedComponent);
}
