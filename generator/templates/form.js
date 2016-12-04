
import _ from 'lodash';

export const formStandard = (objectName, options={}, formContent) => {
  formContent = formContent.replace(/\n/g, '\n      ');
  const classNameInstance = _.camelCase(objectName) + 'Form';
  const className = _.upperFirst(classNameInstance);
  const bootstrapOptions = [ 'Col', 'Row' ];

  options.formControl && (bootstrapOptions.push('FormControl'));
  options.checkbox && (bootstrapOptions.push('Checkbox'));
  options.radio && (bootstrapOptions.push('Radio'));

  return `
import React, { Component } from 'React';
import A10Field from 'components/Field';
import A10Form from 'components/Form/A10Form';
import { widgetWrapper } from 'helpers/widgetWrapper';
import { A10SubmitButtons } from 'components/Form/A10SubmitButtons';
import { ${_.join(bootstrapOptions, ', ')} } from 'react-bootstrap';

class ${className} extends Component {

  render() {
    return (
      ${formContent}
    );
  }
}
export default widgetWrapper()(${className});
`;
};

export const renderTemplate = (filename, fields=[], submitButton='') => {
  let fieldContent = _.join(fields, '\n');
  fieldContent = fieldContent.replace(/\n/g, '\n      ');
  return `<A10Form schema="${filename}" horizontal>
  <Row>
    <Col>
      ${fieldContent}
    </Col>
  </Row>
  ${submitButton}
</A10Form>`;
};
