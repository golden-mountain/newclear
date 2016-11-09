import Model from 'helpers/Model';

export default class ModelPlugin {
  onInitialize() {
    // console.log('executed initial at ModelPlugin', this.props, this.context);
    this.model = new Model(this.cm, this.instancePath, this.props.dispatch);
  }

  onMount() {
    // console.log('executed mount  at ModelPlugin');
    this.model.initialize();
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
        getModel: this.model.getModel.bind(this.model),
        getValue: this.model.getValue.bind(this.model),
        setValue: this.model.setValue.bind(this.model),
        getMeta: this.model.getMeta.bind(this.model),
        setDataInvalid: this.model.setInvalid.bind(this.model, true),
        setDataValid: this.model.setInvalid.bind(this.model, false),
        getDataInvalid: this.model.getInvalid.bind(this.model),
        save: this.model.save.bind(this.model),
        hold: this.model.setValue.bind(this.model)
      }
    );
  }

}
