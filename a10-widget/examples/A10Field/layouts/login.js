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
            _componentId: 'b',
            label: 'User',
            component: 'FieldGroup',
          },
          {
            label: 'Password',
            type: 'password',
            _componentId: 'c',
            component: 'FieldGroup',
          },
          {
            _componentId: 'd',
            component: 'Button',
            bsStyle: 'primary',
            schemaChildren: 'Log in'
          },
          {
            _componentId: 'e',
            component: 'Button',
            schemaChildren: 'Cancel'
          }
        ]
      }
    ]
  }
}
