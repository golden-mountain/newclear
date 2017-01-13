import { GridView } from '../../../src/widgets/A10GridView';

export default (name, options = [33, 33, 33]) => {
  const child = [];
  for (let i = 0; i < 3; i++) {
    const item = [];
    for (let j = 0; j < options.length; j++) {
      item.push({
        _componentId: `${i}-${j}`,
        component: 'div',
        _isContainer: true,
        width: options[j]
      });
    }
    child.push(item);
  }

  return {
    iconClassName: 'fa fa-user',
    type: 'basic',
    name: name,
    schema: {
      _componentId: 'root',
      _isRoot: true,
      component: GridView,
      schemaChildren: child
    }
  };
};

