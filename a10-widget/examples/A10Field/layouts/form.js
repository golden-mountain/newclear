export default {
  iconClassName: 'fa fa-list-alt',
  type: 'basic',
  name: 'form',
  schema: {
    _componentId: 'root',
    component: 'RootWidget',
    _isRoot: true,
    schemaChildren: [
      {
        _componentId: 'form',
        _isContainer: true,
        component: 'Form',
        horizontal: true,
        schemaChildren: [
          {
            _componentId: 'd',
            component: 'ButtonToolbar',
            bsStyle: 'primary',
            schemaChildren: [
              {
                _componentId: 'd',
                component: 'Button',
                bsStyle: 'primary',
                schemaChildren: 'Save'
              },
              {
                _componentId: 'e',
                component: 'Button',
                schemaChildren: 'Cancel'
              }
            ]
          },
        
        ]
      }
    ]
  }
};
