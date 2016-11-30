import ModelPlugin from './ModelPlugin';

// dev plugins: works under __DEV__ is true
import EditablePropsInjector from './Editable';

export let devPlugins =  [
  EditablePropsInjector
];

export let prodPlugins = [
  ModelPlugin
];


// need register plugin at initialize level
export const registerWidgetPlugins = (pluginClass, dev=false) => { // eslint-disable-line
  if (dev) {
    devPlugins.concat(pluginClass);
  } else {
    prodPlugins.concat(pluginClass);
  }
};
