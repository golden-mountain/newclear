import { toPath, set } from 'lodash';
import { fromJS, List } from 'immutable';
// import { axapiGet } from 'helpers/axapiHelper';

export default class FieldConnector {
  constructor(options, formData, env, change) {
    this.options = options;
    this._formData = formData;
    this._env = env;
    this._change = change;
    // console.log('...............', options, formData, env, change);
  }

  getOptions() {
    return this.options || {};
  }

  connectTo(connectTo, values) {
    let valuePath = [ this._env.form, 'values' ];
    connectTo = fromJS(connectTo);
    connectTo.forEach((map, prefix) => {
      const formValue = this._formData.getIn(valuePath.concat(toPath(prefix)));
      let obj = formValue.toJS();
      
      if (List.isList(formValue)) {
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
        map.forEach((source, target) => {
          let v = values.getIn(toPath(source));
          if (v) {
            set(obj, target, v);
          }
        });
      }          
      // console.log('object value is...............', obj);
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
    console.log('ready to connect to result0');

    let { connectToResult, onLoad } = this.options;

    console.log('ready to connect to result');
    if (connectToResult) {
      promise.then((values) => {
        console.log('ready to connect to result 2');
        const newValues = values.pop().body;
        console.log('ready to connect to result 3');        
        // values is axapi returned values
        this.connectTo(connectToResult, fromJS(newValues));
        // onLoad could connect to values once
        console.log('ready to connect to result 4');        
        if (onLoad) {
          console.log('ready to connect to result 5');
          onLoad(newValues);   
          console.log('ready to connect to result 6');
        }
      });
    }
    
    return promise;
  }

  connectToApiStore(apiData) {
    let result = [];
    apiData.forEach((data) => {
      data.forEach((req) => {
        result.push(req.toJS());
      });
    });

    return result;
  }
}
