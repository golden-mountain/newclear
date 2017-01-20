export default {
  iconClassName: 'fa fa-list-alt',
  type: 'basic',
  name: 'form',
  schema: {
    component: 'RootWidget',
    schemaChildren: [
      {
        component: 'Form',
        horizontal: true,
        schemaChildren: [
          {
            component: 'ButtonToolbar',
            bsStyle: 'primary',
            schemaChildren: [
              {
                component: 'Button',
                bsStyle: 'primary',
                schemaChildren: 'Save'
              },
              {
                component: 'Button',
                schemaChildren: 'Cancel'
              }
            ]
          }
        ]
      }
    ]
  }
};
