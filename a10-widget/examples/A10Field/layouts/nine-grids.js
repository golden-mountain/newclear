export default {
  iconClassName: 'fa fa-th',
  type: 'basic',
  name: 'nine-grid',
  schema: {
    _componentId: 'root',
    component: 'div',
    schemaChildren: [
      {
        _componentId: 'row1',
        component: 'Row',
        schemaChildren: [
          {
            _componentId: 'col11',
            component: 'Col',
            _isContainer: true,
            md: 4
          },
          {
            _componentId: 'col12',
            component: 'Col',
            _isContainer: true,
            md: 4
          },
          {
            _componentId: 'col13',
            component: 'Col',
            _isContainer: true,
            md: 4
          }
        ]
      },
      {
        _componentId: 'row2',
        component: 'Row',
        schemaChildren: [
          {
            _componentId: 'col21',
            component: 'Col',
            _isContainer: true,
            md: 4
          },
          {
            _componentId: 'col22',
            component: 'Col',
            _isContainer: true,
            md: 4
          },
          {
            _componentId: 'col23',
            component: 'Col',
            _isContainer: true,
            md: 4
          }
        ]
      },
      {
        _componentId: 'row3',
        component: 'Row',
        schemaChildren: [
          {
            _componentId: 'col31',
            component: 'Col',
            _isContainer: true,
            md: 4
          },
          {
            _componentId: 'col32',
            component: 'Col',
            _isContainer: true,
            md: 4
          },
          {
            _componentId: 'col33',
            component: 'Col',
            _isContainer: true,
            md: 4
          }
        ]
      }
    ]
  }
};
