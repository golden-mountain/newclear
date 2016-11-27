
import _ from 'lodash';


class ConvertForm {

  constructor(schema, domain, name, options) {
    this.schema = schema;
    this.domain = domain;
    this.name = name;
    this.options = options;
  }

  attributeName() {
    return `name="${this.domain}.${this.name}"`;
  }

  attributeValue() {
    return `value="${this.options.default}"`;
  }

  attributeLabel() {
    return `label="${_.startCase(this.name)}"`;
  }

  attributeConditional() {
    return `conditional={{ '${this.name}': false }}`;
  }

  attributes() {
    let attributes = [ this.attributeName(), this.attributeLabel() ];

    this.options.default && attributes.push(this.attributeValue());
    this.options.conditional && attributes.push(this.attributeConditional());

    return _.join(attributes, ' ');
  }

  childRadio() {

  }

  childCheckbox() {

  }

  template() {
    const attributes = this.attributes();

    return `<A10Field ${attributes} />`;
  }

  render() {
    return this.template();
  }
}

export default ConvertForm;
