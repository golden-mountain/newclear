
// import fs from 'fs';
// import CONFIG from '../config';

const cwd = process.cwd();

const getJsonSchema = (file) => {
  console.log(file);
  try {
    let sc = require(file);
    return sc;
  } catch (err) {
    return undefined;
  }
};

export default (key) => {
  const filename = `${key}.json`;
  // const exists = fs.existsSync(`${config.schemaPath}${filename}`);
  // if (!exists) {
  //   return {};
  // }

  const schema = getJsonSchema(`${cwd}/schemas/${filename}`);
  return {
    schema: schema,
    layout: '',
    candidates: ''
  };
};
