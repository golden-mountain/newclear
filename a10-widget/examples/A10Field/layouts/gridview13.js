import { GridView } from '../../../src/widgets/A10GridView';

export default {
  iconClassName: 'fa fa-th',
  type: 'basic',
  name: 'gridview13',
  schema: {
    _componentId: 'root',
    _isRoot: true,
    component: GridView,
    schemaChildren: [
      {
        _componentId: '1',
        component: 'div',
        _isContainer: true,
        width: 25
      },
      {
        _componentId: '2',
        component: 'div',
        _isContainer: true,
        width: 75
      },
      {
        _componentId: '3',
        component: 'div',
        _isContainer: true,
        width: 25
      },
      {
        _componentId: '4',
        component: 'div',
        _isContainer: true,
        width: 75
      },
      {
        _componentId: '5',
        component: 'div',
        _isContainer: true,
        width: 25
      },
      {
        _componentId: '6',
        component: 'div',
        _isContainer: true,
        width: 75
      }
    ]
  }
};
