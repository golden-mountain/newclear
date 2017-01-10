import BaseObject from '../base/base_object';
import mongoose from 'mongoose';

class Communicator extends BaseObject {
  /**
   * Initialize mongoose open channel and error handling.
   *
   * @param args
   */
  init(args) {
    mongoose.connect(args.connectionString);
    mongoose.connection.on('error', args.communicatorErrorConnection);
    mongoose.connection.once('open', args.communicatorActiveChannel);
  }

  /**
   * Getter get active communicator data access link.
   *
   * @returns {*}
   */
  get activeChannel() {
    return mongoose.connection;
  }
}

export default Communicator;
