import invariant from 'invariant';
import { isArray, forEach, set, get } from 'lodash';

import { getPayload } from 'helpers/axapiHelper';
import { axapiRequest } from 'redux/modules/app/axapi';
import Schema from 'helpers/Schema';
import { setComponentState } from 'redux/modules/app/component';
import { getResponseBody } from 'helpers/axapiHelper';

/**
 * Model data stored at component manager's path tree
 */
export default class Model {
  _requestCache = {}

  constructor(cm, instancePath, dispatch) {
    // save cm manager as all other cm
    this.cm = cm;
    this.dispatch = dispatch;
    this.instancePath = instancePath;
    this.node = this.cm.getNode(this.instancePath);
    // this._initialize();
    if (!this.node) {
      invariant(this.node, ' does not exists on component tree');
    }
  }

  initialize() {
    // console.log(this.node);
    const model = this.node.model;
    let initialState = { invalid: false, visible: true };
    if (model.meta && model.meta.initial) {
      initialState['active-data'] = model.meta.initial;
    }
    this.dispatch(setComponentState(this.instancePath, initialState));

    if (get(model, 'meta.loadInitial', false)) {
      this.pullData();
    }
  }

  _syncDataToRedux(data) {
    // console.log(this.instancePath, data);
    this.dispatch(setComponentState(this.instancePath, data));
  }

  setModel(values, sync=false) {
    this._setModel(values, null, sync);
  }

  _setModel(values, instancePath=null, sync=false) {
    let thisNode = null;
    if (!instancePath) {
      thisNode = this.node;
    } else {
      thisNode = this.cm.getNode(instancePath);
    }

    thisNode.model = Object.assign({}, thisNode.model, values);
    if (sync) {
      this._syncDataToRedux(thisNode.model);
    } else {
      if (values.initial) {
        this.setValue(values.initial);
      }
    }
  }

  getModel(key='') {
    // const this.node = this.cm.getNode(this.instancePath);
    return key ? this.node.model[key] : this.node.model;
  }

  setValue(value) {
    this._setModel({ value }, this.instancePath);
    this._syncDataToRedux({ 'active-data': value });
  }

  setInvalid(invalid=true) {
    this.setModel({ invalid });
    this._syncDataToRedux({ 'invalid': invalid });
  }

  getMeta() {
    return this.getModel('meta');
  }

  getValue() {
    return this.getModel('value');
  }

  getInvalid() {
    return this.getModel('invalid');
  }

  _parseBody(body) {
    let content = {};
    forEach(body, (data, key) => {
      set(content, key, data);
    });
    return content;
  }

  getRequests(method) {
    // try to find self meta to see if it savable
    // const this.node = this.cm.getNode(this.instancePath);
    if (!this.node.model.meta) {
      return false;
    }

    const NO_ENDPOINT = '__NO_END_POINT__';
    let requests = {};
    const getRequest = (node) => {
      let nodes = node;
      if (!isArray(node)) {
        nodes = [ node ];
      }
      // if explictly provide endpoint
      nodes.forEach((n) => {
        if (n.model.meta) {
          let meta = n.model.meta, value = n.model.value;
          // console.log(value, '..............');
          let url = '';
          if (meta.endpoint) {
            // payload = getPayload(meta.endpoint, method, value);
            url = meta.endpoint;
          } else if ( meta.schema || meta.name.indexOf('.') > -1 ) {
            let { schema, name } = meta;
            if (!schema ) {
              let objs = name.split('.');
              schema = objs.shift();
              name = objs.join('.');
            }
            const schemaObj = new Schema(schema, name);
            // payload = getPayload(schema.getAxapiURL(), method, value);
            url = schemaObj.getAxapiURL(meta.urlParams) || NO_ENDPOINT;
          } else {
            url = NO_ENDPOINT;
          }
          // console.log(value);
          if (requests[url] && requests[url][meta.name]) {
            requests[url][meta.name] = value;
          } else {
            requests[url] = { [ meta.name ] : value };
          }
        }

        if (n.children.length) {
          getRequest(n.children);
        }
      });
    };
    getRequest(this.node);

    // parse requests as real request
    let finalRequests = [];
    forEach(requests, (body, url) => {
      let payload = null;
      if (body && url !== NO_ENDPOINT) {
        body = this._parseBody(body);
        payload = getPayload(url, method, body);
        finalRequests.push(payload);
      }
    });

    // console.log(finalRequests);
    return finalRequests;
  }

  _pullDataToNode(body, node) {
    if (!body || !node)  return false;

    if (node.children.length) {
      node.children.forEach((n) => {
        this._pullDataToNode(body, n);
      });
    } else {
      const value = get(body, node.model.meta.name);
      // console.log(value, node.model.meta.name);
      if (value !== undefined) {
        this.setValue(value, node.model.instancePath);
      }
    }
  }

  // pull data for inintial
  pullData() {
    let requests = this.getRequests('GET');
    const setModel = (body) => {
      // keep name same as redux component 'data'
      // active-data correspond model value
      this.setModel({ data: body });
      this._pullDataToNode(body, this.node);
    };
    // console.log(requests, '.............................');
    if (!requests.length) {
      console.error('cannot PULL Data because this element ', this.instancePath, ' is not set endpoint');
    } else {
      let validRequests = requests.filter((req) => {
        // TODO: unit test with cache data
        if (this._requestCache[req.path]) {
          setModel(this._requestCache[req.path]);
        }
        return !this._requestCache[req.path];
      });
      const result = this.dispatch(axapiRequest(this.instancePath, validRequests, false));
      result.then((resp) => {
        const mapResp = (r) => {
          // console.log(r);
          const body = getResponseBody(r);
          this._requestCache[r.req.url] = body;
          // keep name same as redux component 'data'
          // active-data correspond model value
          // this.setModel({ data: body });
          // this._pullDataToNode(body, this.node);
          setModel(body);
        };

        if (isArray(resp)) {
          resp.forEach(mapResp);
        } else {
          mapResp(resp);
        }
      });
    }
  }

  pushData( method='POST', notifiable=false) {
    return this.save( method, notifiable);
  }

  /**
   * Save data to end point
   */
  save(method='POST') {
    // try to find self meta to see if it savable
    let requests = this.getRequests(method);
    // console.log(requests, '.............................');
    if (!requests.length) {
      console.error('cannot save because this element ', this.instancePath, ' is not set endpoint');
    } else {
      const result = this.dispatch(axapiRequest(this.instancePath, requests, method));
      result.then(() => {
        this.cm.setInvalid(true);
        this.setInvalid();
      });
    }
  }

}
