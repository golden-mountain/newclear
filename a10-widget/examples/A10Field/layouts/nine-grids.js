export default {
  iconClassName: 'fa fa-th',
  type: 'basic',
  name: 'nine-grid',
  schema: {
    component: 'RootWidget',
    schemaChildren: [
      {
        component: 'Row',
        schemaChildren: [
          {
            component: 'Col',
            md: 4
          },
          {
            component: 'Col',
            md: 4
          },
          {
            component: 'Col',
            md: 4
          }
        ]
      },
      {
        component: 'Row',
        schemaChildren: [
          {
            component: 'Col',
            md: 4
          },
          {
            component: 'Col',
            md: 4
          },
          {
            component: 'Col',
            md: 4
          }
        ]
      },
      {
        component: 'Row',
        schemaChildren: [
          {
            component: 'Col',
            md: 4
          },
          {
            component: 'Col',
            md: 4
          },
          {
            component: 'Col',
            md: 4
          }
        ]
      }
    ]
  }
};
