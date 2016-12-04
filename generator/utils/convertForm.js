
import _ from 'lodash';
import { formStandard, renderTemplate } from '../templates/form';
import { submitField } from '../templates/field';

import SchemaAnalysis from './SchemaAnalysis';


class ConvertForm {

  constructor(filename, schema) {
    this.filename = filename;
    this.sa = new SchemaAnalysis(filename, schema);
    this.sa.setFields();
    this.functions = [];
  }

  spaces(start, num) {
    return start + _.padEnd(' ', num);
  }

  getName() {
    return this.sa.getName();
  }

  getFullPath() {
    const fullName = this.sa.getFullName();
    let names = fullName.split('.');
    let folders = names.map((name) => {
      return _.upperFirst(_.camelCase(name));
    });
    // folders.push('components');
    return folders;
  }

  // header() {
  //   return `${this.headerDefualt()}${this.headerReactBootstrap()}\n\n`;
  // }

  getRender() {
    let fields = this.sa.render();
    const submitButton = submitField();
    return renderTemplate(this.filename, fields, submitButton);
  }

  toJson() {
    return this.sa.toJson();
  }

  render() {
    this.functions.push({ name: 'render', content: this.getRender() });

    const name = this.getName();
    return formStandard(name, this.sa.options, this.getRender());
  }

}

export default ConvertForm;
