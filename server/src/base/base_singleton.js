import BaseObject from './base_object';
import _ from '../utils/underscore';

class BaseSingleton extends BaseObject {
  /**
   * Singleton creation if there is no instance valid we recreate the object instance
   * If the instance valid we not create a new instance of the object.
   *
   * @param args
   * @param callback
   * @returns {null}
   */
  static create(args, callback) {
    // Do we created the instance already?
    if (!this.$instance) {
      this.executeInitAlways(args);
      return this.$instance;
    }

    this.$instance = super.create(args, callback);
    this.executeInitAlways(arguments);

    return this.$instance;
  }


  /**
   * Execute function init always every time the instance tried to recreate.
   * 
   * @param args
   */
  static executeInitAlways(args) {
    if (!_.isFunction(this.$instance.initAlways)) {
      return;
    }

    this.$instance.initAlways.call(this.$instance, args);
  }
}

export default BaseSingleton;
