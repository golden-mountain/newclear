import BaseObject from '../base/base_object';

class BaseHandler extends BaseObject {

  /**
   * Initializing handler.
   *
   * @param args
   */
  init(args) {
    super.init(args);
  }


  /**
   * Getter handler context.
   *
   * @returns {BaseHandler}
   */
  get ctx() {
    return this;
  }
}

export default BaseHandler;
