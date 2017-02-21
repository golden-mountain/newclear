
import _ from 'lodash';
// import { formStandard, renderTemplate } from '../templates/form';
// import { submitField } from '../templates/field';

// import SchemaAnalysis from './SchemaAnalysis';


class ConvertForm {

  constructor(sa, filename) {
    this.filename = filename;
    this.sa = sa;
    this.functions = [];

    this.initMapping();
  }

  initMapping() {
    this.mapping = {
      component: 'A10Form',
      name: _.upperFirst(_.camelCase(this.filename) + 'Form'),
      schema: this.filename,
      horizontal: true
    };
  }

  // spaces(start, num) {
  //   return start + _.padEnd(' ', num);
  // }
  //
  // getName() {
  //   return this.sa.getName();
  // }
  //
  // getFullPath() {
  //   const fullName = this.sa.getFullName();
  //   let names = fullName.split('.');
  //   let folders = names.map((name) => {
  //     return _.upperFirst(_.camelCase(name));
  //   });
  //   // folders.push('components');
  //   return folders;
  // }
  //
  // // header() {
  // //   return `${this.headerDefualt()}${this.headerReactBootstrap()}\n\n`;
  // // }
  //
  // getRender() {
  //   let fields = this.sa.render();
  //   const submitButton = submitField();
  //   return renderTemplate(this.filename, fields, submitButton);
  // }
  //
  // toJson() {
  //   return this.sa.toJson();
  // }
  //
  // render() {
  //   this.functions.push({ name: 'render', content: this.getRender() });
  //
  //   const name = this.getName();
  //   return formStandard(name, this.sa.options, this.getRender());
  // }

  render() {
    const fieldTemplates = this.sa.renderFields().join('\n  ');
    const button = this.sa.renderSubmitButton();
    return `<${this.mapping.component}>
  ${fieldTemplates}
  ${button}
</${this.mapping.component}>`;
  }

  getMapping() {
    const filedMappings = this.sa.getFieldMapping();
    const buttonMapping = this.sa.getSubmitButtonMapping();
    filedMappings.push(buttonMapping);
    this.mapping.schemaChildren = filedMappings;
    return this.mapping;
  }

}

export default ConvertForm;
