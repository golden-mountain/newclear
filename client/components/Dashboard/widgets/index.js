
export BaseInfo from './BaseInfo';
export Licensed from './Licensed';
export * as System from './system';
export * as Networks from './networks';

export function getWidget(widgets, path) {
  let result = widgets;
  const name = path.split('.');
  for (let i = 0; i < name.length; i++) {
    result = result[name[i]];
  }
  return result;
}
