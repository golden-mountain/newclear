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
export const registerWidgetPlugin = (pluginClass, dev=false) => { // eslint-disable-line
  if (dev) {
    devPlugins.push(pluginClass);
  } else {
    prodPlugins.push(pluginClass);
  }
};
