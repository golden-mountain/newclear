import React, { Component, PropTypes } from 'react'; //PropTypes
import { connect } from 'react-redux';
// import hoistStatics from 'hoist-non-react-statics';
import { getAppPageVar, getAppEnvVar } from './stateHelper';
// import React, { Component, PropTypes } from 'react'; //PropTypes
// import { connect } from 'react-redux';
import { uniqueId, upperFirst } from 'lodash';
// import { getAppEnvVar, getAppPageVar } from 'helpers/stateHelper';
import { buildInstancePath } from 'helpers/actionHelper';

// wrapper for widgets, add a wrapper to get state
export const widgetWrapper = widgetProps => {
  // const uniqueId = (prefix='') => {
  //   return prefix + new Date().getTime() + Math.round(Math.random()*10000);
  // };
  return WrappedComponent => {
    // console.log(WrappedComponent, '..........................');
    WrappedComponent.displayName = WrappedComponent.displayName || 'NOT_DEFINED_DISPLAY_NAME';
    const wrappedComponentId = uniqueId( WrappedComponent.displayName + '-' );

    // TODO: the uniqueId not changed when set new component
    WrappedComponent.componentId = wrappedComponentId;

    const displayName = `Widget${WrappedComponent.displayName}`;
    const connectorName = `Connect(${displayName})`;
    const connectorId = wrappedComponentId;

    class Widget extends Component {
      static displayName = displayName

      static contextTypes = {
        props: PropTypes.object,
        // context: PropTypes.object,
        ballKicker: PropTypes.object
      }

      static childContextTypes = {
        props: PropTypes.object,
        // context: PropTypes.object,
        ballKicker: PropTypes.object
      }

      _componentId = uniqueId(displayName + '-')

      constructor(props, context) {
        super(props, context);
        // this.context.ballKicker.registerStandardsBall(this.instancePath);
        const { instancePath, pagePath } = this.context.props;
        // console.log(instancePath, this.instancePath);
        // console.log('Wrapped Widget Name:', widgetName, 'Wrapper Name: ', displayName, 'Connector Name:', connectorName);
        // console.log('----Wrapped Widget ID:', WrappedComponent.componentId, '----Wrapper ID: ', this.componentId, '----Connector ID:', connectorId);
        this.context.ballKicker.registerComponent(this.connectInstancePath, instancePath || pagePath);
        this.context.ballKicker.registerComponent(this.instancePath, this.connectInstancePath);
        // this.context.ballKicker.registerComponent(this.instancePath, instancePath || pagePath);
        // this.context.ballKicker.registerComponent(this.wrappedComponentPath, this.instancePath);
        this.context.ballKicker.printComponentTree();
      }

      /**
       * support all actions dispatchable
       * new method name like 'comSetComponentData', 'comSetComponentVisible'
       */
      getNewMethods(instancePath) {
        const appActions = {};
        Object.keys(window.appActions).forEach((actionName) => {
          const newMethodName = `com${upperFirst(actionName)}`;
          appActions[newMethodName] = (...args) => {
            args.unshift(instancePath);
            return this.props.dispatch(window.appActions[actionName].apply(null, args));
          };
        });
        return appActions;
      }

      get componentName() {
        return displayName;
      }

      get componentId() {
        return this._componentId;
      }

      get instanceData() {
        const data = this.props.page.getIn(this.instancePath);
        if (data) {
          return data.toJS();
        } else {
          return {};
        }
      }

      get pageId() {
        return this.props.env.pageId || 'UNKNOWN-PAGE-ID';
      }

      get pageName() {
        return this.props.env.page || 'UNKNOWN-PAGE';
      }

      get visible() {
        return this.props.page.getIn([ ...this.instancePath, 'visible' ], true);
      }

      get data() {
        return this.props.page.getIn([ ...this.instancePath, 'data' ]);
      }

      get activeData() {
        return this.props.page.getIn([ ...this.instancePath, 'active-data' ]);
      }

      get instancePath() {
        return buildInstancePath(this.pageName, this.pageId, this.componentName, this.componentId );
      }

      get connectInstancePath() {
        return buildInstancePath(this.pageName, this.pageId, connectorName, connectorId );
      }

      get wrappedComponentPath() {
        return buildInstancePath(this.pageName, this.pageId, WrappedComponent.displayName, WrappedComponent.componentId );
      }

      getChildContext() {
        const thisProps = {
          instancePath: this.instancePath,
          ...this.getNewMethods(this.instancePath)
        };

        const props = Object.assign(
          {},
          this.context.props,
          thisProps
        );
        // console.log(this.context.props, thisProps);
        return {  props: props, ballKicker: this.context.ballKicker };
      }

      render() {
        const newProps = Object.assign(
          {}, this.props, this.getNewMethods(this.instancePath),
          {
            instancePath: this.instancePath,
            data: this.data,
            visible: this.visible,
            activeData: this.activeData,
            instanceData: this.instanceData,
            findParent: this.context.ballKicker.findParent.bind(this.context.ballKicker, this.instancePath),
            findTargetByName: this.context.ballKicker.findTargetByComponentName.bind(this.context.ballKicker),
            findBallReceiver: this.context.ballKicker.findTargetReceiver.bind(this.context.ballKicker, this.instancePath),
            kickBall: this.context.ballKicker.kick.bind(this.context.ballKicker, this.instancePath),
            accpetBall: this.context.ballKicker.accept.bind(this.context.ballKicker, this.instancePath),
            registerBalls: this.context.ballKicker.registerStandardsBall.bind(this.context.ballKicker, this.instancePath)
          }
        );
        // console.log('widgetProps', this.visible);
        return this.visible ? React.createElement(WrappedComponent, newProps) : null;
      }
    }

    const stateMapper = (state) => {
      return {
        env: getAppEnvVar(state),
        page: getAppPageVar(state),
        app: state.getIn([ 'app' ]),
        form: state.getIn([ 'form' ]),
        ...widgetProps
      };
    };

    let newComponent = connect(stateMapper)(Widget);
    newComponent.displayName = connectorName;
    newComponent.componentId = connectorId; //`Connect(${displayName})`;
    // newComponent.contextTypes =  { props: PropTypes.object.isRequired };
    // return hoistStatics(newComponent, Widget, WrappedComponent);
    return newComponent;
  };
};

export default widgetWrapper;
