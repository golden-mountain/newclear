import BaseHandler from '../base/base_handler';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

class AuthenticationHandler extends BaseHandler {
  static CLASS = 'AuthenticationHandler';
  
  init(args = {}) {
    super.init(args);
    // console.log('Authentication handler init.');
  }


  /**
   * Authenticate user.
   *
   * @param req
   * @param res
   */
  authenticate(req, res) {
    let token = jwt.sign({ username: 'idan', test: 123 }, 'test', {
      expiresIn: 1440 // expires in 24 hours
    });

    // return the information including token as JSON
    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
    });
  }


  test(req, res) {
    return res.send('Test');
  }

  testData(req, res) {
    return res.send('Test');
  }

  testDataData(req, res) {
    return res.send('Test');
  }
}

export default AuthenticationHandler;
