import BaseRoute from '../base/base_route';

class AuthenticationRoute extends BaseRoute {
  static CLASS = 'AuthenticationRoute';
  
  init() {
    super.init({
      rootPath: '/'
    });
  }


  /**
   * Define route map.
   *
   * @returns {*[]}
   */
  routeMap() {
    return [
      {
        path: '/',
        method: 'get',
        handler: 'test'
      },
      {
        path: '/authenticate',
        method: 'post',
        handler: 'authenticate'
      },
      {
        path: '/test',
        method: 'get',
        handler: 'testData'
      },
      {
        path: '/user',
        method: 'get',
        handler: 'testDataData'
      }
    ];
  }
}

export default AuthenticationRoute;
