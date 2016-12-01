import ModelPlugin from './ModelPlugin';
import EditablePlugin from './EditablePlugin';

// dev plugins: works under __DEV__ is true
// import EditablePropsInjector from './Editable';

export const devPlugins =  [
  EditablePlugin
];

export const prodPlugins = [
  ModelPlugin,
  EditablePlugin
];
