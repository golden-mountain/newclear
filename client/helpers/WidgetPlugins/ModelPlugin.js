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
        getModel: this.model.getModel.bind(this.model, this.instancePath),
        getValue: this.model.getValue.bind(this.model, this.instancePath),
        setValue: this.model.setValue.bind(this.model, this.instancePath),
        getMeta: this.model.getMeta.bind(this.model, this.instancePath),
        setDataInvalid: this.model.setInvalid.bind(this.model, this.instancePath, true),
        setDataValid: this.model.setInvalid.bind(this.model, this.instancePath, false),
        getDataInvalid: this.model.getInvalid.bind(this.model, this.instancePath),
        save: this.model.save.bind(this.model, this.instancePath),
        hold: this.model.setValue.bind(this.model, this.instancePath)
      }
    );
  }

}
