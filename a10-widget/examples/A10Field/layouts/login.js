export default {
  iconClassName: 'fa fa-user',
  type: 'basic',
  name: 'login',
  schema: {
    _componentId: 'root',
    _isRoot: true,
    component: 'div',
    schemaChildren: [
      {
        _componentId: 'a',
        component: 'Panel',
        header: 'Login',
        _isContainer: true,
        schemaChildren: [
          {
            component: 'Form',
            _componentId: 'whatever',
            horizontal: true,
            schemaChildren: [
              {
                _componentId: 'b',
                label: 'User',
                component: 'FieldGroup'
              },
              {
                label: 'Password',
                type: 'password',
                _componentId: 'c',
                component: 'FieldGroup'
              },
              {
                _componentId: 'd',
                component: 'FormGroup',
                schemaChildren: [
                  {
                    _componentId: 'h',
                    component: 'Col',
                    xs: 12,
                    schemaChildren: [
                      {
                        _componentId: 'e',
                        component: 'ButtonToolbar',
                        className: 'pull-right',
                        schemaChildren: [
                          {
                            _componentId: 'f',
                            component: 'Button',
                            bsStyle: 'primary',
                            schemaChildren: 'Log in'
                          },
                          {
                            _componentId: 'g',
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
