
import ConvertField from './convertField';


class SchemaAnalysis {

  constructor(schemaName, schema) {
    this.schemaName = schemaName;
    this.schema = schema;
    this.fields = [];
  }

  getName() {
    return 'obj-name' in this.schema && this.schema['obj-name'];
  }

  getFullName() {
    return this.schema['obj-lineage-full'];
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

  render() {
    return this.fields.map((field) => {
      return field.render();
    });
    // return _.join(this.fields, '\n');
  }
}

export default SchemaAnalysis;
