import React, { Component, PropTypes } from 'react'; //PropTypes
import { connect } from 'react-redux';
// import { getAppPageVar } from './stateHelper';
import { uniqueId,  get, isArray, isEqual } from 'lodash';
import { buildInstancePath } from 'helpers/actionHelper';
import { devPlugins, prodPlugins } from './WidgetPlugins';
// import { Iterable } from 'immutable';

// wrapper for widgets, add a wrapper to get state
export const widgetWrapper = ReduxDataConnector => {
  // const uniqueId = (prefix='') => {
  //   return prefix + new Date().getTime() + Math.round(Math.random()*10000);
  // };
  return WrappedComponent => {

    const displayName = `Widget${WrappedComponent.displayName}`;
    // console.log(uniqueId(displayName));

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
        this.plugins = [];
        this.registerPlugins();
        this.cm = this.context.cm;

        const { instancePath, pagePath } = this.context.props;
        const {
          meta, value, schema, name, loadInitial,
          conditional, validation, urlParams,
          invalid, action
        } = this.props;

        const componentMeta = {
          meta: {
            endpoint:action,
            schema, name, value, loadInitial,
            conditional, validation, urlParams, invalid, ...meta
          }
        };
        // this.context.cm.registerComponent(this.instancePath, instancePath || pagePath);
        this.cm.registerComponent(this.instancePath, instancePath || pagePath, componentMeta);
        // this.cm.printComponentTree(true);
        // this.cm.acceptBalls();
        this.executePluginMethod('onInitialize');
        // console.log(this.context.props);
      }

      registerPlugins() {
        if (__DEV__) { // eslint-disable-line
          this.plugins = devPlugins.map((Plugin) => {
            if (Plugin.name) {
              return new Plugin();
            }
          });
        }

        this.plugins = this.plugins.concat(prodPlugins.map((Plugin) => {
          if (Plugin && Plugin.name) {
            return new Plugin();
          }
        }));
      }

      executePluginMethod(methodName, props, ...args) {
        let result = props;
        this.plugins.forEach((plugin) => {
          if (plugin && plugin[methodName]) {
            let _result = plugin[methodName].call(this, result, args);
            if (!_result && plugin.name) {
              console.warn('No result returns from ', plugin.name );
            } else {
              result = _result;
            }
          }
        });
        return result;
      }

      createInstancePath(prefix='') {
        if (!prefix) {
          prefix = this.componentName;
        }
        return buildInstancePath(this.pageName, this.pageId, prefix, uniqueId(prefix + '-') );
      }

      get componentName() {
        return displayName;
      }

      get componentId() {
        return this._componentId;
      }

      get instanceData() {
        const data = this.props.app && this.props.app.getIn(this.instancePath);
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
        if (this.props.app) {
          return this.props.app.getIn([ ...this.instancePath, 'visible' ], true);
        } else {
          return true;
        }
      }

      get data() {
        // console.log(this.props, this.instancePath);
        return this.props.app && this.props.app.getIn([ ...this.instancePath, 'data' ]);
      }

      get activeData() {
        return this.props.app && this.props.app.getIn([ ...this.instancePath, 'active-data' ]);
      }

      get instancePath() {
        if (this.props._instancePath) {
          return this.props._instancePath;
        }
        return buildInstancePath(this.pageName, this.pageId, this.componentName, this.componentId );
      }

      // get wrappedComponentPath() {
      //   return buildInstancePath(this.pageName, this.pageId, WrappedComponent.displayName, WrappedComponent.componentId );
      // }

      getChildContext() {
        let props = Object.assign(
          {},
          this.context.props,
          this.getNewProps()
        );
        // console.log(props);
        return { props: props, cm: this.context.cm };
      }

      componentWillMount() {
        // console.log('Mount at .............', WrappedComponent.displayName);
        this.executePluginMethod('onMount');
      }

      componentWillUnmount() {
        this.executePluginMethod('onUnmount');
        this.cm.ballKicker.removeEvent(this.instancePath);
        // Comment reason: some times we need keep data , example, window popup
        // this.cm.unregisterComponent(this.instancePath);
        // this.cm.printComponentTree();
      }

      componentWillReceiveProps(nextProps, nextState) {
        // console.log('Receive at .............', WrappedComponent.displayName);
        this.executePluginMethod('onReceiveProps', nextProps, nextState);
      }

      componentWillUpdate(nextProps, nextState) {
        return this.executePluginMethod('onBeforeUpdate', nextProps, nextState) || true;
      }

      shouldComponentUpdate(nextProps, nextState) {
        let result = this.executePluginMethod('onShouldUpdate', nextProps, nextState) || true;
        if (result) {
          result = this.checkWidgetDataUpdate(nextProps);
        }
        // console.log(result, this.instancePath);
        return result;
      }

      checkWidgetDataUpdate(nextProps) {
        if (!nextProps || !nextProps.app) {
          return true;
        }
        const thisComInstanceData = this.instanceData;
        const nextComInstanceData = nextProps.app.getIn(this.instancePath).toJS();
        // console.log(thisComInstanceData);
        const defaultCheckFields = [ 'data', 'active-data', 'visible', 'errorMsg', 'invalid', 'submitErrors' ];
        const needUpdateFields = this.props.updateFields || defaultCheckFields;
        return this.checkComponentNeedUpdate(needUpdateFields, nextComInstanceData, thisComInstanceData);
      }

      checkComponentNeedUpdate(needUpdateFields, nextProps, thisProps) {
        // const needUpdateFields = [ 'input.value', 'data', 'visible', 'activeData' ];
        for (let i in needUpdateFields) {
          const fieldName = needUpdateFields[i];
          const nextValue = get(nextProps, fieldName), thisValue = get(thisProps, fieldName);
          if (!isEqual(nextValue, thisValue)) {
            // console.log('field need update: ', fieldName, nextValue, thisValue );
            return true;
          }
        }
        return false;
      }

      getNewProps(overideProps={}) {
        let pluginProps = this.executePluginMethod('onBeforeSetProps') || {};
        let props = Object.assign(
          {},
          this.props,
          // this.getNewMethods(this.instancePath),
          {
            instancePath: this.instancePath,
            parentPath: this.context.props.instancePath,
            data: this.data,
            node: this.cm.getNode(this.instancePath),
            // initialValues: this.data || this.context.props.initialValues,
            visible: this.visible,
            activeData: this.activeData,
            instanceData: this.instanceData,
            checkComponentNeedUpdate: this.checkComponentNeedUpdate.bind(this),
            checkWidgetDataUpdate: this.checkWidgetDataUpdate.bind(this),
            createInstancePath: this.createInstancePath.bind(this),
            findParent: this.cm.findParent.bind(this.cm, this.instancePath),
            findTargetByName: this.cm.findTargetByComponentName.bind(this.cm),
            findBallReceiver: this.cm.findTargetReceiver.bind(this.cm, this.instancePath),
            kickBall: this.cm.ballKicker.kick.bind(this.cm.ballKicker, this.instancePath),
            catchBall: this.cm.ballKicker.accept.bind(this.cm.ballKicker, this.instancePath),
            registerBalls: this.cm.listener.registerStandardBalls.bind(this.cm.listener, this.instancePath)
          },
          overideProps,
          pluginProps
        );

        return props;
      }

      render() {
        const newProps = this.getNewProps();
        // console.log('widgetProps',  this.componentId, this.visible);
        return (this.visible ? <WrappedComponent  {...newProps} /> : null);
      }
    }

    // let ConnnectedWidget = null;
    if (ReduxDataConnector) {
      let conn = ReduxDataConnector;
      if (isArray(ReduxDataConnector)) {
        conn = (state) => {
          let result = {};
          ReduxDataConnector.forEach((name) => {
            let path = null;
            if (isArray(name)) {
              path = name;
            } else {
              path = [ name ];
            }
            result[name] = state.getIn(path);
          });
          return result;
        };
      }
      return connect(conn)(Widget);
    } else {
      return connect()(Widget);
    }
    // return ConnnectedWidget;
  };
};

export default widgetWrapper;
