const minimum = (param) => (value) => parseInt(value) >= parseInt(param) ? '' : `Minimum value greater than ${param}`; 
const maximum = (param) => (value) => parseInt(value) <= parseInt(param) ? '' : `Maximum value less than ${param}`;
const createValidationFuncs = (schema) => {
  const validationFuncs = { 
    'minimum': minimum(schema['minimum']),
    'maximum': maximum(schema['maximum']),
    'minimum-partition': minimum(schema['minimum-partition']),
    'maximum-partition': maximum(schema['maximum-partition'])
  };
  return validationFuncs;
};

export default createValidationFuncs;
