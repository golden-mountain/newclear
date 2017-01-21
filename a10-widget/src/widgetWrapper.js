import React, { Component, PropTypes } from 'react'; //PropTypes
import { connect } from 'react-redux';
import { uniqueId,  get, isArray, isEqual } from 'lodash';

import { buildInstancePath } from './utils';
import { WidgetPlugin } from './plugins';
import { getWidgetManager } from './WidgetManager';

// wrapper for widgets, add a wrapper to get state
export const widgetWrapper = ReduxDataConnector => {
  // const uniqueId = (prefix='') => {
  //   return prefix + new Date().getTime() + Math.round(Math.random()*10000);
  // };
  return (WrappedComponent, members={} ) => {

    const displayName = `Widget${WrappedComponent.displayName}`;
    // console.log(uniqueId(displayName));

    class Widget extends Component {
      static displayName = displayName

      static propTypes = {
      }

      static contextTypes = {
        props: PropTypes.object,
        // context: PropTypes.object,
        wm: PropTypes.object
      }

      static childContextTypes = {
        props: PropTypes.object,
        // context: PropTypes.object,
        wm: PropTypes.object
      }

      _componentId = uniqueId(displayName + '-')

      constructor(props, context) {
        super(props, context);
        this.plugins = [];
        this.registerPlugins();
        this.wm = getWidgetManager(this.props.dispatch);

        const {
          meta, value, schema, name, loadInitial,
          conditional, validation, urlParams,
          invalid, action
        } = this.props;

        const componentMeta = {
          meta: {
            endpoint:action,
            schema: typeof schema === 'string' ? require(`../../schemas/${schema}.json`) : schema, 
            name, value, loadInitial,
            conditional, validation, urlParams, invalid, ...meta
          }
        };

        this.parentInstancePath = this.defaultPageInstancePath;
        if (this.context && this.context.props) {
          this.parentInstancePath = this.context.props.instancePath;
        }
        this.wm.registerComponent(this.instancePath, this.parentInstancePath, componentMeta);
        // this.wm.printwidgetTree(true);
        // this.wm.acceptBalls();
        this.executePluginMethod('onInitialize');
        // console.log(this.context.props);
      }

      registerPlugins() {
        if (__DEV__) { // eslint-disable-line
          this.plugins = WidgetPlugin.devPlugins.map((Plugin) => {
            if (Plugin.name) {
              return new Plugin();
            }
          });
        }

        this.plugins = this.plugins.concat(WidgetPlugin.prodPlugins.map((Plugin) => {
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

      get defaultPageInstancePath() {
        return [ location.pathname, 'default' ];
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
        // const { pagePath=[] } = this.context.props;
        return this.parentInstancePath[1];
      }

      get pageName() {
        // const { pagePath=[] } = this.context.props;
        // return pagePath[0] || 'UNKNOWN-PAGE';
        return this.parentInstancePath[0];
      }

      get visible() {
        if (this.props.app) {
          return this.props.app.getIn([ ...this.instancePath, 'visible' ], true);
        } else {
          return true;
        }
      }

      getData(name='default') {
        // console.log(this.props.app && this.props.app.getIn([ ...this.instancePath, 'data' ]));
        return this.props.app && this.props.app.getIn([ ...this.instancePath, 'data', name ]);
      }

      get activeData() {
        return this.props.app && this.props.app.getIn([ ...this.instancePath, 'activeData' ]);
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
        return { props, wm: this.context.wm };
      }

      componentWillMount() {
        // console.log('Mount at .............', WrappedComponent.displayName);
        this.executePluginMethod('onMount');
      }

      componentWillUnmount() {
        this.executePluginMethod('onUnmount');
        this.wm.ballKicker.removeEvent(this.instancePath);
        // Comment reason: some times we need keep data , example, window popup
        // this.wm.unregisterComponent(this.instancePath);
        // this.wm.printwidgetTree();
      }

      componentWillReceiveProps(nextProps, nextState) {
        // console.log('Receive at .............', WrappedComponent.displayName);
        this.executePluginMethod('onReceiveProps', nextProps, nextState);
      }

      componentWillUpdate(nextProps, nextState) {
        return this.executePluginMethod('onBeforeUpdate', nextProps, nextState) || true;
      }

      shouldComponentUpdate(nextProps, nextState) {
        if (this.props.isComponentEditor && (this.props !== nextProps || this.state !== nextState)) return true;
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
        const defaultCheckFields = [ 'data', 'activeData', 'visible', 'errorMsg', 'invalid', 'submitErrors', 'children' ];
        const needUpdateFields = this.props.updateFields || defaultCheckFields;
        return this.checkComponentNeedUpdate(needUpdateFields, 
          { ...nextComInstanceData, children: nextProps.children }, 
          { ...thisComInstanceData, children: this.props.children });
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
            parentPath: this.parentInstancePath,
            data: this.getData(),
            getData: this.getData.bind(this),
            node: this.wm.getNode(this.instancePath),
            location: this.props.location || location ,
            // initialValues: this.data || this.context.props.initialValues,
            visible: this.visible,
            activeData: this.activeData,
            instanceData: this.instanceData,
            checkComponentNeedUpdate: this.checkComponentNeedUpdate.bind(this),
            checkWidgetDataUpdate: this.checkWidgetDataUpdate.bind(this),
            createInstancePath: this.createInstancePath.bind(this),
            findParent: this.wm.findParent.bind(this.wm, this.instancePath),
            findTargetByName: this.wm.findTargetByComponentName.bind(this.wm),
            findBallReceiver: this.wm.findTargetReceiver.bind(this.wm, this.instancePath),
            kickBall: this.wm.ballKicker.kick.bind(this.wm.ballKicker, this.instancePath),
            catchBall: this.wm.ballKicker.accept.bind(this.wm.ballKicker, this.instancePath)
            // registerBalls: this.wm.listener.registerStandardBalls.bind(this.wm.listener, this.instancePath)
          },
          overideProps,
          pluginProps
        );
        // console.log(this.context.props.location);
        return props;
      }

      render() {
        // console.log(this.context.props);
        const newProps = this.getNewProps();
        // console.log('widgetProps',  this.componentId, this.visible);
        return (this.visible ? <WrappedComponent {...newProps} /> : null);
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
      return Object.assign(connect(conn, null, null, { withRef: true })(Widget), members);
    } else {
      return Object.assign(connect(null, null, null, { withRef: true })(Widget), members);
    }
    // return ConnnectedWidget;
  };
};

export default widgetWrapper;
