
import fs from 'fs';
import _ from 'lodash';
// var exec = require('child_process').exec;
import ConvertForm from './utils/convertForm';
// import FormDocument from './utils/formDocument';

import CONFIG from './config.js';

const initFolder = (initPath, paths) => {
  const exists = fs.existsSync(initPath);
  if (!exists) {
    // fs.rmdirSync(initPath);
    fs.mkdirSync(initPath);
  }

  paths.map((path) => {
    initPath += '/' + path;
    if (!fs.existsSync(initPath)) {
      fs.mkdirSync(initPath);
    }
  });

};

const writeFile = (folderPath, content) => {
  const filename = 'Form.js';
  fs.writeFileSync(`${folderPath}/${filename}`, content);
};

const writeFrom = (convertForm) => {
  const content = convertForm.render();
  const folders = convertForm.getFullPath();
  initFolder(CONFIG.templatePath, folders);
  const fullPaht = _.join(folders, '/');
  writeFile(CONFIG.templatePath + fullPaht, content);
};

const files = [
  'slb-template-logging.json',
  'slb-template-virtual-server.json',
  'slb-virtual-server.json',
  'slb-virtual-service.json'
];

(() => {
  files.map((file) => {
    let sc = require(CONFIG.schemaPath + file);
    const name = file.replace('.json', '');
    let cf = new ConvertForm(name, sc);
    // initFolder(CONFIG.templatePath);
    writeFrom(cf);
  });


  // let doc = new FormDocument(sa);
  // console.log(doc.toDoc());
})();
