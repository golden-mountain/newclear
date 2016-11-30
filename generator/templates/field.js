
export const a10Field = (attributes) => {
  return `
<A10Field ${attributes} />
`;
};

export const a10FieldInner = (attributes, childs) => {
  return `
<A10Field ${attributes}>
  <div>
    ${childs.replace(/\n/g, '\n    ')}
  </div>
</A10Field>
`;
};

export const radio = (attributes) => {
  return `<Radio ${attributes} />`;
};

export const checkbox = (attributes) => {
  return `<Checkbox ${attributes} />`;
};
