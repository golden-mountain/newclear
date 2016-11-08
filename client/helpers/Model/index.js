import { getPayload } from 'helpers/axapiHelper';
import { axapiRequest } from 'redux/modules/app/axapi';
import Schema from 'helpers/Schema';
/**
 * Model data stored at component manager's path tree
 */
export default class Model {
  constructor(cm, dispatch) {
    // save cm manager as all other cm
    this.cm = cm;
    this.dispatch = dispatch;
  }

  setModel(instancePath, values) {
    const thisNode = this.cm.getNode(instancePath);
    thisNode.model = Object.assign({}, thisNode.model, values);
  }

  getModel(instancePath, key='') {
    const thisNode = this.cm.getNode(instancePath);
    return key ? thisNode.model[key] : thisNode.model;
  }

  setValue(instancePath, value) {
    this.setModel(instancePath, { value });
  }

  setInvalid(instancePath, invalid=true) {
    this.setModel(instancePath, { invalid });
  }

  getMeta(instancePath) {
    return this.getModel(instancePath, 'meta');
  }

  getValue(instancePath) {
    return this.getModel(instancePath, 'value');
  }

  getInvalid(instancePath) {
    return this.getModel(instancePath, 'invalid');
  }

  /**
   * @param onlySelf save only self, without children
   * @return Array
   */
  getRequests(instancePath, method) {
    // try to find self meta to see if it savable
    const thisNode = this.cm.getNode(instancePath);
    if (!thisNode.model.meta) {
      return false;
    }

    let requests = [];
    const getRequest = (node) => {
      // if explictly provide endpoint
      let meta = node.model.meta;
      if (meta.endpoint) {
        const payload = getPayload(node.meta.endpoint, method, node.model.value);
        requests.push(payload);
      } else if ( meta.schema ) {
        const schema = new Schema(meta.schema, meta.name, meta.urlParams);
        const payload = getPayload(schema.getAxapiURL(), method, node.model.value);
        requests.push(payload);
      }
    };

    getRequest(thisNode);
    return requests;
  }

  // pull data for inintial
  pullData() {

  }

  pushData(instancePath, method='POST', notifiable=false) {
    return this.save(instancePath, method, notifiable);
  }

  /**
   * Save data to end point
   */
  save(instancePath, method='POST') {
    // try to find self meta to see if it savable
    let requests = this.getRequests(instancePath, method);
    // console.log(requests, '.............................');
    if (!requests.length) {
      console.error('cannot save because this element ', instancePath, ' is not set endpoint');
    } else {
      const result = this.dispatch(axapiRequest(instancePath, requests, method));
      result.then(() => this.cm.setInvalid(instancePath, true));
    }
  }

}
