import ModelPlugin from './ModelPlugin';

// dev plugins: works under __DEV__ is true
import EditablePropsInjector from './Editable';

export class WidgetPlugin {
  static devPlugins =  [
    EditablePropsInjector
  ]

  static prodPlugins = [
    ModelPlugin
  ]
}


// need register plugin at initialize level
export const registerWidgetPlugins = (plugins, dev=false) => { // eslint-disable-line
  if (dev) {
    WidgetPlugin.devPlugins = WidgetPlugin.devPlugins.concat(plugins);
  } else {
    WidgetPlugin.prodPlugins = WidgetPlugin.prodPlugins.concat(plugins);
  }
};
