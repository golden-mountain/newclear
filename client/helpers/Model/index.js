import { getPayload } from 'helpers/axapiHelper';
import { axapiRequest } from 'redux/modules/app/axapi';

/**
 * Model data stored at component manager's path tree
 */
export default class Model {
  constructor(cm, dispatch) {
    // save cm manager as all other cm
    this.cm = cm;
    this.dispatch = dispatch;
  }

  /**
   * Save data to end point
   */
  save(instancePath, method='POST', notifiable=false) {
    // try to find self meta to see if it savable
    let meta = this.cm.getMeta(instancePath);
    if (!meta || !meta.endpoint) {
      console.error('cannot save because this element ', instancePath, ' is not set endpoint');
    } else {
      let data = this.cm.getValue(instancePath);
      if (meta.endpoint.indexOf('axapi/v3') > -1) {
        const payload = getPayload(meta.endpoint, method, data);
        const result = this.dispatch(axapiRequest(instancePath, payload, notifiable));
        // save success and expire the data
        result.then(() => this.cm.setInvalid(instancePath, true));
      } else {
        // save to other UI Handler
      }
    }

  }

}
