import { GridView } from '../../../src/widgets/A10GridView';

export default {
  iconClassName: 'fa fa-user',
  type: 'basic',
  name: 'gridview22',
  schema: {
    _componentId: 'root',
    component: GridView,
    children: [
      {
        _componentId: '1',
        component: 'div',
        _isContainer: true,
        width: 50
      },
      {
        _componentId: '2',
        component: 'div',
        _isContainer: true,
        width: 50
      },
      {
        _componentId: '3',
        component: 'div',
        _isContainer: true,
        width: 50
      },
      {
        _componentId: '4',
        component: 'div',
        _isContainer: true,
        width: 50
      }
    ]
  }
};
