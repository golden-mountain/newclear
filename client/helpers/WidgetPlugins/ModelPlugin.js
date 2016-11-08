import Model from 'helpers/Model';

export default class ModelPlugin {
  onInitialize() {
    // console.log('executed initial at ModelPlugin', this.props, this.context);
    this.model = new Model(this.cm, this.props.dispatch);
  }

  onMount() {
    // console.log('executed mount  at ModelPlugin');
  }

  onUnmount() {
    // console.log('executed unmount  at ModelPlugin');
  }

  onReceiveProps() {
    // console.log('executed receive props  at ModelPlugin');
  }

  onBeforeUpdate() {
    // console.log('executed before update  at ModelPlugin');
  }

  onShouldUpdate() {
    // console.log('executed should update  at ModelPlugin');
    return true;
  }

  onBeforeSetProps(previousProps) {
    // console.log('executed before set props at ModelPlugin', previousProps);
    return Object.assign(
      {},
      previousProps,
      {
        getModel: this.cm.getModel.bind(this.cm, this.instancePath),
        getValue: this.cm.getValue.bind(this.cm, this.instancePath),
        setValue: this.cm.setValue.bind(this.cm, this.instancePath),
        getMeta: this.cm.getMeta.bind(this.cm, this.instancePath),
        setDataInvalid: this.cm.setInvalid.bind(this.cm, this.instancePath, true),
        setDataValid: this.cm.setInvalid.bind(this.cm, this.instancePath, false),
        getDataInvalid: this.cm.getInvalid.bind(this.cm, this.instancePath),
        save: this.model.save.bind(this.model, this.instancePath),
        hold: this.cm.setValue.bind(this.cm, this.instancePath)
      }
    );
  }

}
