
export const rootSchema = {
  iconClassName: 'fa fa-th',
  type: 'basic',
  name: 'newLayout',
  schema: {
    component: 'RootWidget',
    schemaChildren: []
  }
};

export const formSchema = (name, childrenSchema) => {
  return {
    component: 'A10Form',
    schema: name,
    redirect: {
      path: 'list'
    },
    horizontal: true,
    children: null,
    schemaChildren: childrenSchema
  };
};

export const setSchemaChildren = (rootSchema, childrenSchema) => {
  rootSchema.schema.schemaChildren = childrenSchema;
};
