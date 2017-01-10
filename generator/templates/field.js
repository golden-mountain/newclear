import _ from 'lodash';

export const basicField = (attributes) => {
  return `<A10Field ${attributes} />`;
};

export const innerField = (attributes, childs) => {
  let optionsContent = formControl(childs);
  optionsContent = optionsContent.replace(/\n/g, '\n    ');
  return `<A10Field ${attributes}>
  <div>
    ${optionsContent}
  </div>
</A10Field>`;
};

export const radio = (attributes) => {
  return `<Radio ${attributes} />`;
};

export const checkbox = (attributes) => {
  return `<Checkbox ${attributes} />`;
};

export const formControl = (selectOptions={}) => {
  let options = [];
  _.forEach(selectOptions, (value, key) => {
    options.push(`<option value="${key}">{'${value}'}</option>`);
  });
  const optionsContent = _.join(options, '\n  ');

  return `<FormControl componentClass="select">
  ${optionsContent}
</FormControl>`;
};

export const submitField = () => {
  return '<A10SubmitButtons {...this.props}/>';
};
