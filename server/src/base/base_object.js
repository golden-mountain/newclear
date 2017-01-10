import _ from '../utils/underscore';

class BaseObject {
  static CLASS = 'BaseObject';


  /**
   * Creating instance instead of using the `new` word.
   *
   * @returns {BaseObject}
   */
  static create(args, callback) {
    // console.log('Creating new instance of  with arguments => ', arguments);

    let $instance = new this();

    this.executeInit($instance, args);

    // console.log('Execute finish Callback');
    if (_.isFunction(callback)) {
      callback.call($instance, $instance);
    }

    return $instance;
  }


  /**
   * Execute init process after the instance has been created
   * This way we split logic that been all the years on ctors.
   *
   * @param instance
   * @param args
   */
  static executeInit(instance, args) {
    // Calling init for class after constructor creation.
    instance.init.call(instance, args);
  }


  constructor(args) { //eslint-disable-line
    // console.log('constructor at base object', args);
    // Numb constructor, constructor should not doing nothing instead of creating an object!
  }


  init(args) { //eslint-disable-line
    // console.log('Initializing with args => ', args);
  }
}

export default BaseObject;
