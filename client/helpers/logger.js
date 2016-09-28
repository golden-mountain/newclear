import { Iterable } from 'immutable';

const parseData = (data) => {
  let result = [];
  for (var i in data) {
    let v = data[i];
    if (typeof v == 'string') {
      console.log('...........................', v, '.............................');
    } else {
      if (Iterable.isIterable(v)) {
        console.log('........... print immutable object ...........');
        result.push(v.toJS()); 
      } else {
        result.push(v);
      }      
    }    
  }
  return result.length == 1 ? result[0] : result;
};

export function collapse() {
  console.groupCollapsed(parseData(arguments));
}

export default collapse;

export function table() {
  const values = parseData(arguments);
  console.table(values);
}

export function group() {
  console.group(parseData(arguments));
}

export function debug() {
  console.log(parseData(arguments));
}
