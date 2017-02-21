
import _ from 'lodash';

import ConvertField from './convertField';
import ConvertForm from './ConvertForm';
import ConvertSubmitButton from './ConvertSubmitButton';


class SchemaAnalysis {

  constructor(filename, schema) {
    this.filename = filename;
    this.schema = schema;
    this.options = {};
    this.fields = [];
    this.form;
    this.submitButton;

    this.init();
    this.initMapping();
  }

  init() {
    this.setFields();
    this.submitButton = new ConvertSubmitButton(this);
    this.form = new ConvertForm(this, this.filename);
  }

  initMapping() {
    this.mapping = {
      iconClassName: 'fa fa-th',
      type: 'basic',
      name: 'newLayout',
      schema: {
        component: 'RootWidget'
      }
    };
  }

  getFieldMapping() {
    return this.fields.map(field => {
      return field.getMapping();
    });
  }

  getSubmitButtonMapping() {
    return this.submitButton.getMapping();
  }

  getMapping() {
    const mapping = this.form.getMapping();
    this.mapping.schema.schemaChildren = [ mapping ];
    return this.mapping;
  }

  renderFields() {
    return this.fields.map(field => {
      return field.render().replace(/\n/g, '\n  ');
    });
  }

  renderSubmitButton() {
    return this.submitButton.render().replace(/\n/g, '\n  ');
  }

  render() {
    // return this.form.render();
    return `

export default widgetWrapper()(VirtualServerForm);
`;
  }

  getName() {
    return 'obj-name' in this.schema && this.schema['obj-name'];
  }

  getFullName() {
    return this.schema['obj-lineage-full'];
  }

  getFullPath() {
    const fullName = this.getFullName();
    let names = fullName.split('.');
    let folders = names.map((name) => {
      return _.upperFirst(_.camelCase(name));
    });
    // folders.push('components');
    return folders;
  }

  getSchemaName() {
    return this.schemaName;
  }

  getProperties() {
    return 'properties' in this.schema && this.schema.properties;
  }

  setFields() {
    const properties = this.getProperties();
    const domain = this.getName();
    if (properties) {
      for (var name in properties) {
        this.fields.push(new ConvertField(this, domain, name, properties[name]));
      }
    }
  }

  checkConditional(conditional) {
    const conditionalSchema = this.schema.properties[conditional];
    console.log('conditionalSchema ----------------->', conditionalSchema);
  }

  setFormControlOption() {
    this.options.formControl = true;
  }

  toString() {
    return this.schema;
  }

  props() {
    let propup = {};
    this.fields.map((field) => {
      propup[field.name] = field.props();
    });
    return propup;
  }

  // render() {
  //   return this.fields.map((field) => {
  //     return field.template();
  //   });
  // }

  toJson() {
    return this.fields.map(field => {
      return field.toJson();
    });
  }
}

export default SchemaAnalysis;
