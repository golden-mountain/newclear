/*globals Promise:true*/

class Underscore {
  constructor() {
    this._initTypes();
  }

  /**
   * Adds some isTypes methods to the class, called during instantiation.
   * Methods: isArguments, isFunction, isString, isNumber, isObject, isDate, isError, isSymbol, isUndefined.
   *
   * @private
   */
  _initTypes() {
    let types = [ 'Arguments', 'Function', 'String', 'Number', 'Object', 'Date', 'Error', 'Symbol', 'Undefined', 'HTMLDivElement' ];

    types.forEach((type) => {
      this['is'+ type] = function (typeName) {
        return input => {
          return '[object '+ typeName +']' === Object.prototype.toString.call(input);
        };
      }(type);
    });
  }


  /**
   * Safe parse json function
   *
   * @param value
   * @param def
   * @returns {*}
   */
  safeParseJSON(value, def) {
    try {
      return JSON.parse(value);
    }
    catch(e) {
      return def;
    }
  }


  /**
   * Convert to string into camel case format.
   *
   * @param str
   * @returns {XML|string}
   */
  toCamelCase(str) {
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2, offset) {
      console.log(offset);
      if (p2) return p2.toUpperCase();
      return p1.toLowerCase();
    });
  }
}

export default new Underscore();
