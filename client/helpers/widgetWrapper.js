import React, { Component, PropTypes } from 'react'; //PropTypes
import { connect } from 'react-redux';
import { getAppPageVar } from './stateHelper';
import { uniqueId, upperFirst } from 'lodash';
import { buildInstancePath } from 'helpers/actionHelper';

// wrapper for widgets, add a wrapper to get state
export const widgetWrapper = widgetProps => {
  // const uniqueId = (prefix='') => {
  //   return prefix + new Date().getTime() + Math.round(Math.random()*10000);
  // };
  return WrappedComponent => {

    const displayName = `Widget${WrappedComponent.displayName}`;

    class Widget extends Component {
      static displayName = displayName

      static contextTypes = {
        props: PropTypes.object,
        // context: PropTypes.object,
        cm: PropTypes.object
      }

      static childContextTypes = {
        props: PropTypes.object,
        // context: PropTypes.object,
        cm: PropTypes.object
      }

      _componentId = uniqueId(displayName + '-')

      constructor(props, context) {
        super(props, context);
        this.cm = this.context.cm;
        this.cm.registerComponent(this.instancePath, this.props.targetInstance);
        // this.cm.printComponentTree();
        // this.cm.acceptBalls();
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
        return this.context.props.pagePath[1] || 'UNKNOWN-PAGE-ID';
      }

      get pageName() {
        return this.context.props.pagePath[0] || 'UNKNOWN-PAGE';
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

      // get wrappedComponentPath() {
      //   return buildInstancePath(this.pageName, this.pageId, WrappedComponent.displayName, WrappedComponent.componentId );
      // }

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
        return {  props: props, cm: this.context.cm };
      }

      render() {
        // const { modalProps } = this.props;
        // console.log(this.context.props);
        const newProps = Object.assign(
          {}, this.props, this.getNewMethods(this.instancePath),
          {
            instancePath: this.instancePath,
            data: this.data,
            visible: this.visible,
            activeData: this.activeData,
            instanceData: this.instanceData,
            findParent: this.cm.findParent.bind(this.cm, this.instancePath),
            findTargetByName: this.cm.findTargetByComponentName.bind(this.cm),
            findBallReceiver: this.cm.findTargetReceiver.bind(this.cm, this.instancePath),
            kickBall: this.cm.ballKicker.kick.bind(this.cm.ballKicker, this.instancePath),
            catchBall: this.cm.ballKicker.accept.bind(this.cm.ballKicker, this.instancePath),
            registerBalls: this.cm.listener.registerStandardBalls.bind(this.cm.listener, this.instancePath)
          }
        );
        // console.log('widgetProps',  this.componentId, this.visible);
        return (this.visible ? <WrappedComponent  {...newProps} /> : null);
      }
    }

    const stateMapper = (state) => {
      return {
        // env: getAppEnvVar(state),
        page: getAppPageVar(state),
        app: state.getIn([ 'app' ]),
        form: state.getIn([ 'form' ]),
        ...widgetProps
      };
    };

    const ConnnectedWidget = connect(stateMapper)(Widget);
    const targetComponentName = `TargetWidget${WrappedComponent.displayName}`;

    class TargetWrapper extends Component {
      static displayName = targetComponentName

      componentId = uniqueId( targetComponentName + '-')

      static contextTypes = {
        props: PropTypes.object,
        cm: PropTypes.object
      }

      static childContextTypes = {
        props: PropTypes.object,
        cm: PropTypes.object
      }

      constructor(props, context) {
        super(props, context);
        const { instancePath, pagePath } = this.context.props;
        this.context.cm.registerComponent(this.instancePath, instancePath || pagePath);
      }

      getChildContext() {
        return {  props: this.context.props, cm: this.context.cm };
      }

      get instancePath() {
        const componentName = targetComponentName;
        const componentId = this.componentId;
        // console.log(this.context.props);
        const [ pageName, pageId ] = this.context.props.pagePath;
        // console.log(this.context.props, pageName, pageId, componentName, componentId );
        return buildInstancePath(pageName, pageId, componentName, componentId );
      }

      render() {
        const { children, ...rest } = this.props;
        return (<ConnnectedWidget targetInstance={this.instancePath} {...rest} >{children}</ConnnectedWidget>);
      }
    }
    return TargetWrapper;
  };
};

export default widgetWrapper;
