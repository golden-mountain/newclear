const makeError = (value, status=true, errMsg='') => (status ? '' : errMsg);

export const required = (value) => value !== undefined && value !== '' ? '' : 'This field is required'; 
export const minimum = (value, defaultValue) => parseInt(value) >= parseInt(defaultValue) ? '' : `Minimum value greater than ${defaultValue}`; 
export const maximum = (value, defaultValue) => parseInt(value) <= parseInt(defaultValue) ? '' : `Maximum value less than ${defaultValue}`;
export const minLength = (value, defaultValue) => value.length >= defaultValue ? '' : `Min length should larger than ${defaultValue}`;
export const maxLength = (value, defaultValue) => value.length <= defaultValue ? '' : `Max length should less than ${defaultValue}`;
export const isInt = (value) => { 
  const y = parseInt(value, 10);
  const result = !isNaN(y) && value == y && value.toString() == y.toString();
  return result ? '' : 'Not a integer';
};

export const ipv6 = (value) => {
  const reg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  return makeError(value, reg.test(value), 'IPv6 Address Invalid');
};

export const ipv4 = (value) => {
  const reg = /^(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$/;
  return makeError(value, reg.test(value), 'IPv4 Address Invalid');
};

export const netmask = (value) => {
  const longReg = /^(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$/;
  const shortReg = /^\/\d{1,2}$/;
  return makeError(value, longReg.test(value) || shortReg.test(value), 'Netmask Could Be Long Format Or Short Format');
};


const createValidFunc = (defaultValue, func) => (value) => func.call(null, value, defaultValue);

export const createValidationFuncs = (schema) => {
  const validationFuncs = { 
    'required': createValidFunc(null, required),
    'object-key': createValidFunc(null, required),
    'ipv6-address': createValidFunc(null, ipv6),
    'ipv4-address': createValidFunc(null, ipv4),
    'ipv4-netmask-brief': createValidFunc(null, netmask),
    'minimum': createValidFunc(schema['minimum'], minimum),
    'maximum': createValidFunc(schema['maximum'], maximum),
    'minLength': createValidFunc(schema['minLength'], minLength),
    'maxLength': createValidFunc(schema['maxLength'], maxLength),
    'number': createValidFunc(null, isInt)
  };
  return validationFuncs;
};

export default createValidationFuncs;
