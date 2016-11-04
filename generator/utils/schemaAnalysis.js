
import FieldConvert from './fieldConvert';

class SchemaAnalysis {

  constructor(schema) {
    this.schema = schema;
    this.fields = [];
  }

  setFieldConvert() {
    const name = this.getName();
    name && (this.fieldConvert = new FieldConvert(name, this.getProperties()));
  }

  getName() {
    return 'obj-name' in this.schema && this.schema['obj-name'];
  }

  getProperties() {
    return 'properties' in this.schema && this.schema.properties;
  }

  setFields() {

    const properties = this.getProperties();
    if (properties) {
      for (var name in properties) {
        this.fields.push(new FieldConvert(name, properties[name]));
      }
    }
  }

  props() {
    let propup = {};
    this.fields.map((field) => {
      propup[field.name] = field.props();
    });
    return propup;
  }

  render() {
    this.setFields();
    return this.fields.map((field) => {
      return field.render();
    });
  }

}

export default SchemaAnalysis;
