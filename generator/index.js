
import fs from 'fs';
import _ from 'lodash';
import ConvertForm from './utils/convertForm';

import CONFIG from './config.js';

class Starter {

  constructor() {
    this.files = [
      'slb-template-logging.json',
      'slb-template-virtual-server.json',
      'slb-virtual-server.json',
      'slb-virtual-service.json'
    ];
  }

  initFolder(initPath, paths) {
    const exists = fs.existsSync(initPath);
    if (!exists) {
      fs.mkdirSync(initPath);
    }

    paths.map((path) => {
      initPath += '/' + path;
      if (!fs.existsSync(initPath)) {
        fs.mkdirSync(initPath);
      }
    });
  }

  writeFile(folderPath, content, filename) {
    fs.writeFileSync(`${folderPath}/${filename}`, content);
  }

  writeFrom(convertForm) {
    const folders = convertForm.getFullPath();

    let jsxContent = convertForm.toJson();
    jsxContent = JSON.stringify(jsxContent, null, 4);
    this.initFolder(CONFIG.jsxSchemaPath, folders);
    const jsxSchemaFullPath = _.join(folders, '/');
    this.writeFile(CONFIG.jsxSchemaPath + jsxSchemaFullPath, jsxContent, 'jsx.json');

    folders.push('components');

    const content = convertForm.render();
    this.initFolder(CONFIG.templatePath, folders);
    const templateFullPath = _.join(folders, '/');
    this.writeFile(CONFIG.templatePath + templateFullPath, content, 'Form.js');
  }

  begin() {
    this.files.map((file) => {
      let sc = require(CONFIG.schemaPath + file);
      const name = file.replace('.json', '');
      let cf = new ConvertForm(name, sc);
      this.writeFrom(cf);
    });
  }

}

const starter = new Starter();
starter.begin();
