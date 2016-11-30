import Model from './Model';

export default class ModelPlugin {
  onInitialize() {
    // console.log('executed initial at ModelPlugin', this.props, this.context);
    this.model = new Model(this.wm, this.instancePath, this.props.dispatch);
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
        model: this.model,
        modelGetModel: this.model.getModel.bind(this.model),
        modelGetValue: this.model.getValue.bind(this.model),
        modelSetValue: this.model.setValue.bind(this.model),
        modelGetMeta: this.model.getMeta.bind(this.model),
        modelSetDataInvalid: this.model.setInvalid.bind(this.model, true),
        modelSetDataValid: this.model.setInvalid.bind(this.model, false),
        modelGetDataInvalid: this.model.getInvalid.bind(this.model),
        modelInitializeChildren: (data) => {
          this.model.initializeChildren(data);
          if (typeof this.props.onInitialize == 'function') {
            this.props.onInitialize(data, this.model.node);
          }
        },
        modelGetFieldProps: () => {
          const model = this.model.node.model;
          if (model.schemaParser && model.meta.name) {
            return model.schemaParser.getFieldProps(model.meta.name);
          } else {
            return {};
          }
        },
        modelGetSchema: () => {
          const model = this.model.node.model;
          if (model.schemaParser) {
            return model.schemaParser.schema;
          } else {
            return {};
          }
        },
        modelSave: this.model.save.bind(this.model),
        modelHold: this.model.setValue.bind(this.model),
        modelReset: this.model.initialize.bind(this.model),
        modelChange: (event) => {
          let value;
          try {
            value = event.target.value;
            const types = [ 'checkbox', 'radio' ], values = [ 'true' , 'false' ];
            if (types.indexOf(event.target.type) > -1  && values.indexOf(value) > -1) {
              value = event.target.checked;
            }
          } catch (e) {
            value = event;
          }

          this.model.setValue(value);
        }
      }
    );
  }

}
