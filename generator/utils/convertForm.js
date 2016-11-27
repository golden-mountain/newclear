
import _ from 'lodash';

import SchemaAnalysis from './SchemaAnalysis';

const defualtHeader = `
import React, { Component } from 'React';
import A10Field from 'components/Field';
import A10Form from 'components/Form/A10Form';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';
`;

const spaces = (num) => {
  return '\n' + _.padEnd(' ', num);
};

const space2 = spaces(2);
const space4 = spaces(4);
const space6 = spaces(6);
const space8 = spaces(8);
const space10 = spaces(10);
const space12 = spaces(12);

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
    folders.push('components');
    // return _.join(folders, '/');
    return folders;
  }

  headerDefualt() {
    return defualtHeader;
  }

  headerReactBootstrap() {
    let bootstrapElements = [ 'Row', 'Col' ];
    const elements = _.join(bootstrapElements, ', ');
    return `import { ${elements} } from 'react-bootstrap';`;
  }

  header() {
    return `${this.headerDefualt()}${this.headerReactBootstrap()}\n\n`;
  }

  getRender() {
    let fields = this.sa.render();

    const fieldContent = _.join(fields, space12);
    const colContent = `<Col xs={12} md={12} lg={6}>${space12}${fieldContent}${space10}</Col>`;
    const rowContent = `<Row>${space10}${colContent}${space8}</Row>`;
    const submitButton = '<A10SubmitButtons {...this.props}/>';
    const formContent = `${space6}<A10Form schema="${this.filename}" horizontal>${space8}${rowContent}${space8}${submitButton}${space6}</A10Form>`;
    return `return (${formContent}${space4});`;
  }

  getFunction() {

  }

  render() {
    this.functions.push({ name: 'render', content: this.getRender() });

    const clsssContent = this.functions.map((func) => {
      return `${space2}${func.name}() {${space4}${func.content}${space2}}`;
    });

    const header = this.header();
    const name = this.getName();

    const classNameInstance = _.camelCase(name) + 'Form';
    const className = _.upperFirst(classNameInstance);

    const classContent = `${header}\nclass ${className} extends Component {${clsssContent}\n}`;

    return `${classContent}\n\nexport default widgetWrapper()(${className});\n`;
  }

}

export default ConvertForm;
