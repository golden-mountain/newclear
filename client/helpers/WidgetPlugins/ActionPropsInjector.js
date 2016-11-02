import { upperFirst } from 'lodash';

export default class ActionPropsInjector {
  /**
   * support all actions dispatchable
   * new method name like 'comSetComponentData', 'comSetComponentVisible'
   */
  onBeforeSetProps() {
    const instancePath = this.instancePath;
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
}
