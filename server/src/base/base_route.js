import BaseObject from './base_object';
import express from 'express';

class BaseRoute extends BaseObject {
  /**
   * Initialize base parameters for routing.
   *
   * @param args
   */
  init(args) {
    this._router = express.Router();
    this._rootPath = args.rootPath || '';
    this._middlewares = args.middlewares || [];
  }


  /**
   * Getter routes instance that include all the routes functions.
   *
   * @returns {*}
   */
  get router() {
    return this._router;
  }


  /**
   * Getter route base route path.
   *
   * @returns {string}
   */
  get routePath() {
    return this._rootPath;
  }


  /**
   * Route global middlewares.
   *
   * @returns {*|Array}
   */
  get middlewares() {
    return this._middlewares;
  }


  /**
   * Inject route middlewares.
   */
  injectMiddlewares() {
    this._middlewares.forEach(middleware => {
      this._router.use(middleware);
    });
  }
}

export default BaseRoute;
