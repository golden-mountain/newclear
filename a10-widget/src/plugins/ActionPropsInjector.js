import { upperFirst } from 'lodash';
import { actions } from '../modules';

export default class ActionPropsInjector {
  /**
   * support all actions dispatchable
   * new method name like 'comSetComponentData', 'comSetComponentVisible'
   */
  onBeforeSetProps(previousProps) {
    const instancePath = this.instancePath;
    const appActions = {};
    Object.keys(actions).forEach((actionName) => {
      const newMethodName = `com${upperFirst(actionName)}`;
      appActions[newMethodName] = (...args) => {
        args.unshift(instancePath);
        return this.context.props.dispatch(actions[actionName].apply(null, args));
      };
    });
    return Object.assign(
      {},
      previousProps,
      appActions
    );
  }
}
