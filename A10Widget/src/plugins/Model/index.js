import invariant from 'invariant';
import { isArray, forEach, set, get } from 'lodash';

import { getPayload, getResponseBody } from '../../utils';
import { axapiRequest } from '../../modules/api';
// import Schema from 'helpers/Schema';
import { setComponentState, unmountComponent } from '../../modules/widget';
// import { getResponseBody } from 'helpers/axapiHelper';
import MetaParser from '../Model/MetaParser';

/**
 * Model data stored at component manager's path tree
 */
export default class Model {
  _requestCache = {}

  constructor(wm, instancePath, dispatch) {
    // save cm manager as all other cm
    this.wm = wm;
    this.dispatch = dispatch;
    this.instancePath = instancePath;
    this.node = this.wm.getNode(this.instancePath);
    // this._initialize();
    if (!this.node) {
      invariant(this.node, ' does not exists on component tree');
    }

    this.metaParser = new MetaParser(this);
    // console.log(this.node.model);
  }

  initialize() {
    // console.log(this.node.model);
    this.resetComponent(this.node, { visible: true });
    if (get(this.node.model, 'meta.loadInitial', false)) {
      this.pullData();
    }

    this.metaParser.initialize();
  }

  resetComponent(node, attrs={}) {
    node.walk((n) => {
      const model = n.model;
      let initialState = { invalid: model.meta.invalid || false, errorMsg: '', submitErrors: [], ...attrs };
      // console.log(model.meta);
      // if (model.meta && model.meta.value !== undefined) {
      initialState['activeData'] = model.meta.value;
      model.value = model.meta.value;
      // }
      // console.log(model.meta.value);
      this.dispatch(setComponentState(n.model.instancePath, initialState));
    });
  }

  unmountComponent() {
    this.dispatch(unmountComponent(this.instancePath));
  }

  _syncDataToRedux(data, instancePath=null) {
    // console.log(this.instancePath, data);
    if (!instancePath) instancePath = this.instancePath;
    this.dispatch(setComponentState(instancePath, data));
  }

  setModel(values, sync=false) {
    this._setModel(values, this.instancePath, sync);
  }

  _setModel(values, instancePath, sync=false) {
    const thisNode = this.wm.getNode(instancePath);
    if (!thisNode) return false;

    // if (values.initial && !thisNode.model.value) {
    //   // this._setValue(values.initial, instancePath);
    //   values.value = values.initial;
    // }

    thisNode.model = Object.assign({}, thisNode.model, values);
    // console.log(values, instancePath, thisNode.model);

    if (sync) {
      // console.log(values);
      // only sync some of model value:  value, invalid, visible, and other
      // important values
      this._syncDataToRedux(values, instancePath);
    }
  }

  getModel(key='') {
    // const this.node = this.wm.getNode(this.instancePath);
    return key ? this.node.model[key] : this.node.model;
  }

  _setValue(value, instancePath, checkConditional=true, checkValidation=true) {
    this._setModel({ value }, instancePath);
    this._syncDataToRedux({ 'activeData': value }, instancePath);
    checkConditional && this.metaParser.changeConditional();
    checkValidation && this.metaParser.checkValidation();
  }

  setValue(value, checkConditional=true, checkValidation=true) {
    this._setValue(value, this.instancePath, checkConditional, checkValidation);
  }

  _setVisible(visible, instancePath, invalidValue=true) {
    let initialState = { invalid: invalidValue && !visible, visible };
    this._setModel(initialState, instancePath, true);
  }

  setVisible(visible, invalidValue=true) {
    this._setVisible(visible, this.instancePath, invalidValue);
  }

  setInvalid(invalid=true) {
    this.setModel({ invalid });
    this._syncDataToRedux({ 'invalid': invalid }, this.instancePath);
  }

  setMeta(meta) {
    let newMeta = Object.assign({}, this.getMeta(), meta);
    this.setModel({ meta: newMeta });
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
      // if (key.indexOf('x.') !== 0 ) {
      set(content, key, data);
      // }
    });
    return content;
  }

  getRequests(method) {
    // try to find self meta to see if it savable
    // const this.node = this.wm.getNode(this.instancePath);
    if (!this.node.model.meta) {
      return false;
    }

    let requests = {};
    const getRequest = (node, validParentUrl='') => {
      let nodes = node;
      if (!isArray(node)) {
        nodes = [ node ];
      }
      // if explictly provide endpoint
      nodes.forEach((n) => {
        // console.log(n);
        if (n.model.meta) {
          let meta = n.model.meta, value = n.model.value;
          let url = '', name = '';
          if (meta.endpoint) {
            // console.log('end point provided');
            url = meta.endpoint;
            name = meta.name;
          // } else if ( n.model.meta.schema ) {
          //   // console.log('schema provided');
          //   url = n.model.schemaParser.getAxapiURL(meta.urlParams) || '';
          //   name = meta.name;
          } else if (validParentUrl) {
            // console.log('attach to parent');
            url = validParentUrl;
            name = meta.name;
            // console.log(value, url, name);
          }

          if (url && !requests[url]) requests[url] = {};

          // console.log('url:', url, 'name:', name, ' value: ', value);

          if (name && name.indexOf('x.') !== 0 && value !== undefined && requests[url] && !n.model.invalid) {
            requests[url] = Object.assign({}, requests[url], { [ name ] : value });
          }

          validParentUrl = url;
        }

        if (n.children.length) {
          // console.log(n.children);
          getRequest(n.children, validParentUrl);
        }
      });
    };
    getRequest(this.node);

    // parse requests as real request
    let finalRequests = [];
    // console.log(requests);

    forEach(requests, (body, url) => {
      let payload = null;
      if (body) {
        body = this._parseBody(body);
        payload = getPayload(url, method, body);
        finalRequests.push(payload);
      }
    });

    // console.log(finalRequests);
    return finalRequests;
  }

  _pullDataToNode(body, node) {
    // console.log(body, node);
    if (!body || !node)  return false;
    if (node.model.meta.name) {
      const value = get(body, node.model.meta.name);

      if (value !== undefined) {
        this._setValue(value, node.model.instancePath);
      }
    }

    if (node.children.length) {
      node.children.forEach((n) => {
        // console.log(n);
        this._pullDataToNode(body, n);
      });
    }
  }

  initializeChildren(body) {
    // console.log(body, this.node.children.length);
    return this._pullDataToNode(body, this.node);
  }

  // pull data for inintial
  pullData() {
    let requests = this.getRequests('GET');
    // console.log(requests);
    const setModel = (body) => {
      // console.log(body, this.node.model.meta.name);
      // keep name same as redux component 'data'
      // activeData correspond model value
      this.setModel({ data: body });
      this._pullDataToNode(body, this.node);
    };
    // console.log(requests, '.............................');
    if (!requests.length) {
      console.error('Can not PULL Data because this element ', this.instancePath, ' is not set endpoint');
    } else {
      let validRequests = requests.filter((req) => {
        // TODO: unit test with cache data
        if (this._requestCache[req.path]) {
          setModel(this._requestCache[req.path]);
        }
        return !this._requestCache[req.path];
      });

      if (validRequests.length) {
        try {
          const result = this.dispatch(axapiRequest(this.instancePath, validRequests, false));
          result.then((resp) => {
            const mapResp = (r) => {
              // console.log(r);
              const body = getResponseBody(r);
              this._requestCache[r.req.url] = body;
              // keep name same as redux component 'data'
              // activeData correspond model value
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
        } catch(e) {
          console.error(e);
        }
      }

    }
  }

  pushData( method='POST', notifiable=false) {
    return this.save( method, notifiable);
  }

  /**
   * Save data to end point
   */
  save(onSuccess=null, method='POST', clearValues=true) {
    // try to find self meta to see if it savable
    let requests = this.getRequests(method);
    // console.log(requests, '.............................');
    if (!requests.length) {
      console.error('cannot save because this element ', this.instancePath, ' is not set endpoint');
    } else {
      // this.resetComponent(this.node);
      const submitErrors = this.metaParser.getSubmitErrors();
      if (!submitErrors.length) {
        const result = this.dispatch(axapiRequest(this.instancePath, requests, true));
        result.then((r) => {
          if (clearValues) {
            console.log(' TODO: will remove all old datas');
            this.resetComponent(this.node);
          }

          try {
            const resp = r.pop();
            const body = getResponseBody(resp);
            if (typeof onSuccess === 'function') {
              onSuccess.call(this, body);
            }
          } catch (e) {
            console.error(e);
          }
        });
        return result;
      } else {
        console.log('some error happened:::', submitErrors);
        this.setModel({ submitErrors });
      }
    }
  }

}
