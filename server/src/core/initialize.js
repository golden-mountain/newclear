import BaseObject from '../base/base_object';
import express from 'express';
import Communicator from './communicator';
import * as CORE from '../constants/environment_constant';
import _ from '../utils/underscore';

class Initialize extends BaseObject {
  static CLASS = 'Initialize';

  init(args) {
    super.init(args);

    this._app = express();
    this.controllers = [];

    this.__creationOfCoreModules(args.config, args.modules);
  }


  /**
   * App instance (express).
   *
   * @returns {*}
   */
  get app() {
    return this._app;
  }


  /**
   * Getter loaded initialized modules.
   *
   * @returns {*}
   */
  get loadedModules() { return this._modules; }


  /**
   * Run application web server.
   *
   * @param port
   * @param callback
   */
  run(port, callback) {
    this._app.listen(port, callback);
  }


  /**
   * Create application controllers.
   */
  createAppControllers() {
    this._modules[CORE.ROUTES_MODULES].forEach(route => {
      // console.log('Creating route => ', route);

      let handler = this._modules[CORE.HANDLERS_MODULES].filter(handlerModule => {
        if (handlerModule.key !== route.key) {
          return;
        }

        return handlerModule;
      });
      handler = handler[0].instance; // Currently we don't support multi handlers for multi routes so we take the first handler.

      // console.log('Found valid handler for the route => ', handler);

      // Inject the route middlewares.
      route.instance.injectMiddlewares();

      route.instance.routeMap().forEach(routeMap => {
        // console.log('route map object => ', routeMap);

        let handlerAction = handler[routeMap.handler];

        // console.log('Looking for a match handler invoker for the route => ', handlerAction);

        if (!_.isFunction(handlerAction)) {
          handlerAction = () => {
            console.error('There is no handler to take care of this route dude..');
          };
        }

        this.controllers.push(route.instance.router[routeMap.method](
          routeMap.path,
          handlerAction.bind(handler.ctx)));

        // Append controller
        this._app.use(route.instance.routePath, route.instance.router);
      });
    });
  }


  /**
   * Create communicator data access channel to manipulate actions over data.
   * 
   * @param communicatorOptions
   */
  createCommunicatorDataAccess(communicatorOptions) {
    Communicator.create(communicatorOptions);
  }


  /**
   * Creation of the application core module by group and give them the correct,
   * Configuration for the configuration environment config.
   *
   * @param configuration
   * @param modules
   * @private
   */
  __creationOfCoreModules(configuration, modules) {
    // console.info('Start initializing modules => ', modules);

    Object.keys(modules).forEach(moduleGroupName => {
      // console.log('Running module group => ', moduleGroupName);

      modules[moduleGroupName].forEach(module => {
        module.instance = module.ref.default.create(this.__configurationByModuleClass(
          configuration,
          module.ref.default.CLASS
        ));
      });

      // console.info('Instantiation application modules for the current scope running group module => ', modules[moduleGroupName]);
    });

    this._modules = modules;
  }


  /**
   * Get configuration per module by their class module name.
   *
   * @param configuration
   * @param moduleClass
   * @returns {*}
   * @private
   */
  __configurationByModuleClass(configuration, moduleClass) {
    // console.log('Get configuration for module class => ', moduleClass);
    return configuration[moduleClass];
  }
}

export default Initialize;
