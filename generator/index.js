import SchemaAnalysis from './utils/schemaAnalysis';
const schemaPath = '../client/schemas/';
let sc = require(schemaPath + 'slb-template-logging.json');

let sa = new SchemaAnalysis(sc);

console.log(sa.getProperties());
console.log(sa.render());
