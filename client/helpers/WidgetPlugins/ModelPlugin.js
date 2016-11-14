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
    this.model.unmountComponent();
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
        getFieldProps: () => {
          const model = this.model.node.model;
          if (model.schemaParser && model.meta.name) {
            return model.schemaParser.getFieldProps(model.meta.name);
          } else {
            return {};
          }
        },
        getSchema: () => {
          const model = this.model.node.model;
          if (model.schemaParser) {
            return model.schemaParser.schema;
          } else {
            return {};
          }
        },
        save: this.model.save.bind(this.model),
        hold: this.model.setValue.bind(this.model),
        reset: this.model.initialize.bind(this.model),
        change: (event) => {
          let value = event.target.value;
          // console.log(value);

          const types = [ 'checkbox', 'radio' ], values = [ 'true' , 'false' ];

          if (types.indexOf(event.target.type) > -1  && values.indexOf(value) > -1) {
            value = event.target.checked;
          }

          this.model.setValue(value);
        }
      }
    );
  }

}
