export default class ViewManager {

  plugins = [  ]

  constructor(...args) {

    args.forEach(({ component, params, data } ) => {
      // console.log(component);
      const plg = new component(params, data);
      this.plugins.push(plg);
    });
  }

  visible() {
    let visible = true;
    this.plugins.forEach((plg) => {
      visible = plg.isVisible();
      if (!visible) {
        return visible;
      }
    });
    return visible;
  }

  readOnly() {
    let readOnly = true;
    this.plugins.forEach((plg) => {
      readOnly = plg.isReadOnly();
      return readOnly;
    });
    return readOnly;
  }
}
