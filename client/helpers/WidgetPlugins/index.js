import ActionPropsInjector from './ActionPropsInjector';
import ContextInjector from './ContextInjector';
import LifeCyclePlugin from './LifeCyclePlugin';

// dev plugins: works under __DEV__ is true
import EditablePropsInjector from './EditablePropsInjector';

export const devPlugins =  [
  EditablePropsInjector
];

export const prodPlugins = [
  ActionPropsInjector,
  ContextInjector,
  LifeCyclePlugin
];
