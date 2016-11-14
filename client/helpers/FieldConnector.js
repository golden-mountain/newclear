import { toPath, set } from 'lodash';
import { fromJS, List } from 'immutable';

export default class FieldConnector {

  connectTo(connectTo, values) {
    let valuePath = [ this._env.form, 'values' ];
    connectTo = fromJS(connectTo);
    connectTo.forEach((map, prefix) => {
      let formValue = this._formData.getIn(valuePath.concat(toPath(prefix)));
      if (!formValue) {
        let path = toPath(prefix);
        path[0] += '-list';
        formValue = this._formData.getIn(valuePath.concat(path));
      }
      let obj = formValue.toJS();

      if (List.isList(formValue)) {
        // console.log('formValue is list', formValue);
        let newObj = {};

        // formValue.forEach((value) => {
        map.forEach((source, target) => {
          let v = values.getIn(toPath(source));
          if (v) {
            set(newObj, target, v);
          }
        });
        // });
        obj.push(newObj);
      } else {
        // console.log('formValue is object', formValue);
        map.forEach((source, target) => {
          let v = values.getIn(toPath(source));
          if (v) {
            set(obj, target, v);
          }
        });
      }
      // console.log('object value is...............', obj, prefix);
      this._change(prefix, fromJS(obj));
    });
  }

  connectToValues(values) {
    let { connectToValue, onLoad } = this.options;
    // onLoad could connect to values once
    if (onLoad) {
      onLoad(values);
    }

    if (connectToValue) {
      this.connectTo(connectToValue, values);
    }
    return values;
  }

  connectToResult(promise) {
    let { connectToResult, onLoad } = this.options;

    if (connectToResult) {
      promise.then((values) => {
        const newValues = values.pop().body;
        if (onLoad) {
          onLoad(newValues);
        }
        // values is axapi returned values
        this.connectTo(connectToResult, fromJS(newValues));
        // onLoad could connect to values once
      });
    }

    return promise;
  }

}
