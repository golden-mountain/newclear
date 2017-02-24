
import _ from 'lodash';

// import { basicField, innerField } from '../templates/field';


class ConvertField {

  constructor(schemaAnalysis, domain, name, options) {
    this.schemaAnalysis = schemaAnalysis;
    this.domain = domain;
    this.name = name;
    if (options.condition && options.condition.indexOf(domain) === -1) {
      options.condition = `${domain}.${options.condition}`;
    }
    this.options = options;

    // console.log('sssssssssssssssssssssssssssssssssssssssssssssss');
    // console.log(domain);
    // console.log(name);
    // console.log(options);

    this.initMapping();
  }

  initMapping() {
    this.mapping = {
      component: 'A10Field',
      name: `${this.schemaAnalysis.getName()}.${this.name}`,
      label: _.startCase(this.name)
    };
    this.options.condition && (this.mapping.conditional = this.options.condition);
  }

  getMapping() {
    return this.mapping;
  }

  render() {
    return `<${this.mapping.component}
      name="${this.domain}-${this.mapping.name}"
      label="${this.mapping.label}"
    />`;
  }

  // jsonToAttribute(attributes) {
  //   var attr = [];
  //   // _.forEach(attributes, (value, key) => {
  //   //   attr.push(`${key}="${value}"`);
  //   // });
  //   attributes.name && attr.push(`name="${attributes.name}"`);
  //   attributes.label && attr.push(`name="${attributes.label}"`);
  //   attributes.value && attr.push(`name="${attributes.value}"`);
  //   return attr;
  // }
  //
  // attributes() {
  //   let attributes = {
  //     name: `${this.domain}.${this.name}`,
  //     label: _.startCase(this.name)
  //   };
  //
  //   this.options.default
  //   && (attributes.value = this.options.default);
  //
  //   this.options.conditional
  //   && (attributes.conditional = this.options.conditional);
  //
  //   this.options.enumMap
  //   && (() => {
  //     attributes.options = {};
  //     this.options.enumMap.map((options) => {
  //       _.forEach(options, (value, key) => {
  //         value = value.replace(/\"/, '');
  //         attributes.options[key] = value;
  //       });
  //     });
  //   })();
  //   return attributes;
  // }
  //
  // childRadio() {
  //
  // }
  //
  // childCheckbox() {
  //
  // }
  //
  // gen() {
  //   this.isGen = true;
  //   this.fieldSchema = this.attributes();
  //   const attributes = _.join(this.jsonToAttribute(this.fieldSchema), ' ');
  //   if (this.fieldSchema.options) {
  //     this.schemaAnalysis.setFormControlOption();
  //     this.fieldTemplate = innerField(attributes, this.fieldSchema.options);
  //   } else {
  //     this.fieldTemplate = basicField(attributes);
  //   }
  //
  // }
  //
  // template() {
  //   if (!this.isGen) {
  //     this.gen();
  //   }
  //   return this.fieldTemplate;
  // }
  //
  // toJson() {
  //   if (!this.isGen) {
  //     this.gen();
  //   }
  //   return this.fieldSchema;
  // }
}

export default ConvertField;
