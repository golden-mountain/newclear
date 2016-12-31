import BaseService from '../base/base_service';

class AuthenticationService extends BaseService {
  static CLASS = 'AuthenticationService';

  init(args) {
    super.init(args);
    this._secret = args.secret;
  }

  /**
   * Getter secret token.
   *
   * @returns {string}
   */
  get secretToken() {
    return this._secret;
  }
}

export default AuthenticationService;
