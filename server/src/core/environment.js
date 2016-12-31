/*globals Promise:true*/
/*globals __dirname:true*/
import BaseObject from '../base/base_object';
import fs from 'fs';
import path from 'path';
import _ from '../utils/underscore';

class Environment extends BaseObject {
  static CLASS = 'Environment';

  init(args) {
    super.init(args);

    this._coreModules = {};
    this._config = args.config;
    this._rootDir = args.rootDir;

    this.loadApplicationModules(args.coreModulesMap);
  }


  /**
   * Getter configuration application environment.
   *
   * @returns {null|*}
   */
  get configuration() {return this._config;}


  /**
   * Getter core modules.
   *
   * @returns {Array}
   */
  get coreModules() {return this._coreModules;}


  /**
   * Getter root dir project.
   *
   * @returns {*}
   */
  get rootDir() {return this._rootDir;}


  /**
   * Load core modules
   *
   * @param coreModulesMap
   */
  loadApplicationModules(coreModulesMap) {
    if (!Array.isArray(coreModulesMap) && 0 === coreModulesMap.length) {
      console.error('Error core modules map array not defined properly.');
      return;
    }

    this.__runCoreModulesMap(coreModulesMap)
      .forEach(modules => {
        if (!Array.isArray(modules.files) && 0 === modules.files.length) {
          console.error('Not found module files.');
          return;
        }

        this._coreModules[modules.name] = this.__loadModuleFiles(
          modules.files,
          modules.path,
          modules.name.substring(modules.name.length - 1, 0));
      });
  }


  /**
   * Iterable over core modules map names.
   *
   * @param coreModulesMap
   * @returns {Array}
   * @private
   */
  __runCoreModulesMap(coreModulesMap) {
    let coreModules = [];

    coreModulesMap.forEach((coreModule) => {
      this.__InitCoreModuleGroup(coreModule);

      // console.info('Load core module location path => ', coreModule);

      let coreModuleGroup = this.__loadCoreModulesLocation(coreModule);

      // console.info('Core modules group => ', coreModules);

      coreModules = coreModules.concat(coreModuleGroup);
    });

    // console.info('All core modules location path waiting for instantiation => ', coreModules);

    return coreModules;
  }


  /**
   * Load modules async.
   *
   * @param coreModulesName
   * @returns {Object}
   * @private
   */
  __loadCoreModulesLocation(coreModulesName) {
    try {
      return {
        name: coreModulesName,
        files: fs.readdirSync(path.resolve(this._rootDir, coreModulesName)),
        path: this._rootDir + '/' + coreModulesName
      };
    }
    catch(readConfigException) {
      console.error(readConfigException);
    }
  }


  /**
   * Load module files.
   *
   * @param files
   * @param moduleRootPath
   * @param groupModulesRemove
   * @returns {Array}
   * @private
   */
  __loadModuleFiles(files = [], moduleRootPath = '', groupModulesRemove = '') {
    // console.info('Loading module files => ', files);
    let moduleFiles = [];

    files.forEach((moduleFile) => {
      // console.log('Remove group => ', groupModulesRemove);
      let moduleName = _
        .toCamelCase(moduleFile
          .replace(groupModulesRemove, '')
          .replace(path.extname(moduleFile), ''));

      try {
        moduleFiles.push({
          basePath: moduleRootPath,
          path: moduleRootPath + '/' + moduleFile,
          fileName: moduleFile,
          fileExtenstion: path.extname(moduleFile),
          ref: require(moduleRootPath + '/' + moduleFile),
          key: moduleName
        });

      } catch (e) {
        console.error('Cannot load file due to the reason => ', e);
      }
    });

    // console.info('Loaded module files => ', moduleFiles);

    return moduleFiles;
  }


  /**
   * Init core module group
   *
   * @param coreModule
   * @private
   */
  __InitCoreModuleGroup(coreModule) {
    // console.info('Init core module container group for new modules => ', coreModule);

    this._coreModules[coreModule] = [];
  }
}

export default Environment;
