
import BaseInfo from './BaseInfo';
import Licensed from './Licensed';
import * as System from './system';
import * as Networks from './networks';

export const Widgets = { BaseInfo, Licensed, System, Networks };
export function getWidget(widgets, path) {
  let result = widgets;
  const name = path.split('.');
  for (let i = 0; i < name.length; i++) {
    result = result[name[i]];
  }
  return result;
}
