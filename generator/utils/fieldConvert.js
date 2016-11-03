
class FieldConvert {

  constructor(name, options) {
    this.name = name;
    this.options = options;
    this.propup = {};
  }

  template() {
    // TODO: Propup convert to json schema.
    return `
    <A10SchemaField
      schema={elements['${this.propup.key}']}
      name="${this.propup.name}"
      ${this.propup.required ? 'required' : ''}
      name="template.virtual-server.icmp-rate-limit"
      label="ICMP Rate Limit"
    />
    `;
  }

  props() {
    // TODO: Json schema convert to propup json.
  }

  render() {
    // Propup json convert to jsx.
    return this.template();
  }
}

export default FieldConvert;
