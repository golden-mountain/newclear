import AuthenticationService from '../services/authentication_service';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

const verifyToken = (req, res, next)=> {
  console.log('Start middleware verify token');

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  console.log('Checking request token => ', token);

  // decode token
  if (!token) {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }

  // verifies secret and checks exp
  jwt.verify(token, AuthenticationService.create().secretToken, function (err, decoded) {
    if (err) {
      return res.json({ success: false, message: 'Failed to authenticate token.' });
    } else {
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    }
  });
};

export { verifyToken };

