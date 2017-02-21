
import fs from 'fs';
import _ from 'lodash';

import SchemaAnalysis from './utils/SchemaAnalysis';
import CONFIG from './config.js';

const cwd = process.cwd();

class Starter {

  constructor() {
    this.files = [
      'slb-template-logging.json',
      'slb-template-virtual-server.json',
      'slb-virtual-server.json'
    ];
    // this.files = [ 'slb-template-logging.json' ];
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

  // writeFrom(convertForm) {
  //   const folders = convertForm.getFullPath();
  //
  //   let jsxContent = convertForm.toJson();
  //   jsxContent = JSON.stringify(jsxContent, null, 4);
  //   this.initFolder(CONFIG.jsxSchemaPath, folders);
  //   const jsxSchemaFullPath = _.join(folders, '/');
  //   this.writeFile(CONFIG.jsxSchemaPath + jsxSchemaFullPath, jsxContent, 'jsx.json');
  //
  //   folders.push('components');
  //
  //   const content = convertForm.render();
  //   this.initFolder(CONFIG.templatePath, folders);
  //   const templateFullPath = _.join(folders, '/');
  //   this.writeFile(CONFIG.templatePath + templateFullPath, content, 'Form.js');
  // }

  writeJsonFile(sa, jsonContent) {
    const folders = sa.getFullPath();
    const jsxSchemaFullPath = _.join(folders, '/');
    const jsxContent = JSON.stringify(jsonContent, null, 2);
    this.initFolder(`${cwd}${CONFIG.jsxSchemaPath}`, folders);
    this.writeFile(`${cwd}${CONFIG.jsxSchemaPath}${jsxSchemaFullPath}`, jsxContent, 'jsx.json');
  }

  writeJsFile(sa, renderContent) {
    const folders = sa.getFullPath();
    const templateFullPath = _.join(folders, '/');
    this.initFolder(`${cwd}${CONFIG.templatePath}`, folders);
    this.writeFile(`${cwd}${CONFIG.templatePath}${templateFullPath}`, renderContent, 'Form.js');
  }

  begin() {
    this.files.map((file) => {
      let sc = require(`${cwd}${CONFIG.schemaPath}${file}`);
      const name = file.replace('.json', '');
      const sa = new SchemaAnalysis(name, sc);
      const mapping = sa.getMapping();
      this.writeJsonFile(sa, mapping);

      const render = sa.render();
      this.writeJsFile(sa, render);
      // let sa = new SchemaAnalysis(name, sc);
      // this.writeFrom(cf);
    });
  }

}

const starter = new Starter();
starter.begin();
