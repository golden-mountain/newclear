import connectToWrap from './Editable';

export default class EditablePlugin {
  onInitialize() {
  }

  onMount() {
    // // console.log('executed mount  at EditablePlugin');
    // this.model.initialize();
  }

  onRender(props, args) {
    // return connectToWrap()(originComponent);
    const originComponent = args ? args[0] : null;
    return connectToWrap()(originComponent);
  }

  onUnmount() {
    // // console.log('executed unmount  at EditablePlugin');
    // this.model.unmountComponent();
  }

  onReceiveProps() {
    // console.log('executed receive props  at EditablePlugin');
  }

  onBeforeUpdate() {
    // console.log('executed before update  at EditablePlugin');
  }

  onShouldUpdate() {
    // console.log('executed should update  at EditablePlugin');
 /*   return true;*/
  }

  onBeforeSetProps(/*previousProps*/) {
    // // console.log('executed before set props at EditablePlugin', previousProps);
    // return Object.assign(
    //   {},
    //   previousProps,
    //   {
    //     model: this.model,
    //     modelGetModel: this.model.getModel.bind(this.model),
    //     modelGetValue: this.model.getValue.bind(this.model),
    //     modelSetValue: this.model.setValue.bind(this.model),
    //     modelGetMeta: this.model.getMeta.bind(this.model),
    //     modelSetDataInvalid: this.model.setInvalid.bind(this.model, true),
    //     modelSetDataValid: this.model.setInvalid.bind(this.model, false),
    //     modelGetDataInvalid: this.model.getInvalid.bind(this.model),
    //     modelInitializeChildren: (data) => {
    //       this.model.initializeChildren(data);
    //       if (typeof this.props.onInitialize == 'function') {
    //         this.props.onInitialize(data, this.model.node);
    //       }
    //     },
    //     modelGetFieldProps: () => {
    //       const model = this.model.node.model;
    //       if (model.schemaParser && model.meta.name) {
    //         return model.schemaParser.getFieldProps(model.meta.name);
    //       } else {
    //         return {};
    //       }
    //     },
    //     modelGetSchema: () => {
    //       const model = this.model.node.model;
    //       if (model.schemaParser) {
    //         return model.schemaParser.schema;
    //       } else {
    //         return {};
    //       }
    //     },
    //     modelSave: this.model.save.bind(this.model),
    //     modelHold: this.model.setValue.bind(this.model),
    //     modelReset: this.model.initialize.bind(this.model),
    //     modelChange: (event) => {
    //       let value;
    //       try {
    //         value = event.target.value;
    //         const types = [ 'checkbox', 'radio' ], values = [ 'true' , 'false' ];
    //         if (types.indexOf(event.target.type) > -1  && values.indexOf(value) > -1) {
    //           value = event.target.checked;
    //         }
    //       } catch (e) {
    //         value = event;
    //       }

    //       this.model.setValue(value);
    //     }
    //   }
    // );
  }

}
