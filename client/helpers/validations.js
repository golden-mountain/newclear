export const minimum = (value, defaultValue) => parseInt(value) >= parseInt(defaultValue) ? '' : `Minimum value greater than ${defaultValue}`; 
export const maximum = (value, defaultValue) => parseInt(value) <= parseInt(defaultValue) ? '' : `Maximum value less than ${defaultValue}`;
export const isInt = (value) => { 
  const y = parseInt(value, 10);
  const result = !isNaN(y) && value == y && value.toString() == y.toString();
  return result ? '' : 'Not a integer';
};

const createValidFunc = (defaultValue, func) => (value) => func.call(null, value, defaultValue);

const createValidationFuncs = (schema) => {
  const validationFuncs = { 
    'minimum': createValidFunc(schema['minimum'], minimum),
    'maximum': createValidFunc(schema['maximum'], maximum),
    'minimum-partition': createValidFunc(schema['minimum-partition'], minimum),
    'maximum-partition': createValidFunc(schema['maximum-partition'], maximum)
  };
  return validationFuncs;
};

export default createValidationFuncs;
