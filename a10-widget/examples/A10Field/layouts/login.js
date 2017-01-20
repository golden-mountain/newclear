export default {
  iconClassName: 'fa fa-user',
  type: 'basic',
  name: 'login',
  schema: {
    component: 'RootWidget',
    schemaChildren: [
      {
        component: 'Panel',
        header: 'Login',
        schemaChildren: [
          {
            component: 'Form',
            horizontal: true,
            schemaChildren: [
              {
                label: 'User',
                component: 'FieldGroup'
              },
              {
                label: 'Password',
                type: 'password',
                component: 'FieldGroup'
              },
              {
                component: 'FormGroup',
                schemaChildren: [
                  {
                    component: 'Col',
                    xs: 12,
                    schemaChildren: [
                      {
                        component: 'ButtonToolbar',
                        className: 'pull-right',
                        schemaChildren: [
                          {
                            component: 'Button',
                            bsStyle: 'primary',
                            schemaChildren: 'Log in'
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
            ]
          }
        ]

      }
    ]
  }
};
