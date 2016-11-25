import ModelPlugin from './ModelPlugin';

// dev plugins: works under __DEV__ is true
import EditablePropsInjector from './Editable';

export const devPlugins =  [
  EditablePropsInjector
];

export const prodPlugins = [
  ModelPlugin
];
