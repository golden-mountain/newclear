export default {
  iconClassName: 'fa fa-user',
  type: 'basic',
  name: 'login',
  schema: {
    _componentId: 'root',
    component: 'div',
    children: [
      {
        _componentId: 'a',
        component: 'Panel',
        header: 'Login',
        _isContainer: true,
        children: [
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
            children: 'Log in'
          },
          {
            _componentId: 'e',
            component: 'Button',
            children: 'Cancel'
          }
        ]
      }
    ]
  }
}
