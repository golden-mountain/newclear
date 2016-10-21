import React, { Component, PropTypes } from 'react'; //PropTypes
import { connect } from 'react-redux';
import hoistStatics from 'hoist-non-react-statics';
import { getAppPageVar, getAppEnvVar } from './stateHelper';
// import React, { Component, PropTypes } from 'react'; //PropTypes
// import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
// import { getAppEnvVar, getAppPageVar } from 'helpers/stateHelper';

// wrapper for widgets, add a wrapper to get state
export function widgetWrapper(WrappedComponent, widgetProps) {

  const widgetName = WrappedComponent.displayName || 'NOT_DEFINED_DISPLAY_NAME';
  const displayName = `Widget${widgetName}`;
  const componentId = uniqueId(displayName + '-');

  class Widget extends Component {
    static displayName = displayName

    static contextTypes = {
      props: PropTypes.object.isRequired
    }

    static childContextTypes = {
      props: PropTypes.object.isRequired
    }

    // _componentId = 0

    constructor(props, context) {
      super(props, context);
    }

    get componentName() {
      return displayName;
    }

    get componentId() {
      // if (!this._componentId) {
      //   this._componentId = uniqueId(this.componentName.toLowerCase() + '-');
      // }
      // return this._componentId;
      return componentId;
    }

    get instanceData() {
      const data = this.props.page.getIn([ this.componentName, this.componentId ]);
      if (data) {
        return data.toJS();
      } else {
        return {};
      }
    }

    get pageId() {
      return this.props.componentEnv.pageId || 'UNKNOWN-PAGE-ID';
    }

    get pageName() {
      return this.props.componentEnv.page || 'UNKNOWN-PAGE';
    }

    get visible() {
      return this.props.page.getIn([ this.componentName, this.componentId, 'visible' ], true);
    }

    get data() {
      return this.props.page.getIn([ this.componentName, this.componentId, 'data' ]);
    }

    get widgetProps() {
      let componentEnv = {
        pageId: this.pageId,
        page: this.pageName,
        componentName: this.componentName,
        componentId: this.componentId
      };
      return componentEnv;
    }

    componentAxapiRequest(data, notifiable=false) {
      return this.context.props.axapiRequest(data, this.pageId, this.componentName, this.componentId, notifiable);
    }

    componentSetState(data) {
      return this.context.props.setComponentState(this.pageId, this.componentName, this.componentId, data);
    }

    getChildContext() {
      const props = Object.assign(
        {},
        this.context.props,
        this.props
      );
      return {  props: props };
    }

    render() {
      const { componentEnv, ...rest } = this.props; // eslint-disable-line
      const newProps = Object.assign(
        {}, rest,
        {
          env: Object.assign(componentEnv, this.widgetProps),
          data: this.data,
          visible: this.visible,
          componentAxapiRequest: ::this.componentAxapiRequest,
          componentSetState: ::this.componentSetState
        }
      );
      // console.log('widgetProps', rest, this);
      this.renderedElement = React.createElement(WrappedComponent, newProps);
      return this.renderedElement;
    }
  }

  const stateMapper = (state) => {
    return {
      componentEnv: getAppEnvVar(state),
      page: getAppPageVar(state),
      app: state.getIn([ 'app' ]),
      form: state.getIn([ 'form' ]),
      ...widgetProps
    };
  };

  let newComponent = connect(stateMapper)(Widget);
  newComponent.displayName = displayName; //`Connect(${displayName})`;
  newComponent.componentId = componentId; //`Connect(${displayName})`;
  // newComponent.contextTypes =  { props: PropTypes.object.isRequired };
  return hoistStatics(newComponent, Widget, WrappedComponent);
}
