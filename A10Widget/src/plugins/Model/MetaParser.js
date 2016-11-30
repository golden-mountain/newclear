import { get } from 'lodash';

export default class MetaParser {

  constructor(modelObject) {
    // Model Object instance
    this.m = modelObject;
    // this.node = modelObject.node;
    // alias to parent node model
    this.model = modelObject.node.model;
    // alias to parent model meta
    this.meta = this.model.meta;
  }

  initialize() {
    const conditional = this.initialConditional();
    let validation = null;
    if (this.meta && this.meta.name) {
      validation = this.getValidations(this.m.node);
    }

    // console.log(conditional, validation);
    this.m.setMeta({ conditional, validation });
    // this.m.wm.printwidgetTree(true);
  }

  getConditional() {
    let { conditional } = this.meta;
    // find meta to get conditional
    // find schema to get conditional if meta.conditional not exists
    // if (conditional !== false && !conditional && this.model.schemaParser && this.meta.name) {
    //   conditional = this.model.schemaParser.getConditional(this.meta.name);
    //   // console.log(this.meta.name, conditional);
    //   if (!conditional) {
    //     return false;
    //   }
    // } else
    if (typeof conditional === 'string') {
      conditional = { [ conditional ] : true };
    }
    // console.log(conditional);
    return conditional || false;
  }

  getValidations(node) {
    let { validation } = node.model.meta;
    // if (!validation && node.model.schemaParser && name) {
    //   validation = node.model.schemaParser.getValidations(name);
    // }
    // console.log('validation..........', validation, this.model.schemaParser);
    return validation || false;
  }

  _isElementVisible(depValue, conditionalObjValue) {
    return depValue === true ? !!conditionalObjValue :
             ( depValue === false ? !conditionalObjValue :
               depValue == conditionalObjValue);
  }

  initialConditional() {
    const conditional = this.getConditional();

    let isVisible = true;
    if (conditional && typeof conditional == 'object' ) {
      // register conditional
      const [ depName, depValue ] = Object.entries(conditional).pop();
      const depOnObjVisible = get(this.model.parent, 'model.visible', true);
      if (depOnObjVisible && depName) {
        const conditionalNode = this.m.wm.widgetTree.first((node) => {
          return get(node.model, 'meta.name') === depName;
        });
        const conditionalObjValue = get(conditionalNode, 'model.value');
        // console.log(conditionalNode);
        // console.log('this node:', this.meta.name, 'depend on:',
        //   depName, 'depend value:', depValue,
        //   ' realtime value:', conditionalObjValue);
        if (typeof depValue == 'function') {
          isVisible = depValue.call(null, conditionalObjValue);
        } else {
          isVisible = this._isElementVisible(depValue, conditionalObjValue);
        }
      } else if (depName) {
        isVisible = false;
      }
    } else {
      isVisible = true;
    }

    this.m.setVisible(isVisible);

    return conditional;
  }

  changeConditional() {
    const thisName = this.meta.name;
    const thisValue = this.m.getValue();
    // console.log(thisName, thisValue);
    const traverseConditional = (root, parentName, parentValue, parentIsVisible) => {
      root.walk((node) => {
        const conditional = get(node, 'model.meta.conditional');
        // console.log(conditional);
        if (typeof conditional == 'object') {
          const [ depName, depValue ] = Object.entries(conditional).pop();
          // console.log(parentName, parentValue, '::', depName, depValue);
          if (parentName == depName) {
            const instancePath = get(node, 'model.instancePath');
            const visible = parentIsVisible && this._isElementVisible(depValue, parentValue);
            if (visible !== get(node, 'model.visible')) {
              this.m._setVisible(visible, instancePath);
              const nodeName = get(node, 'model.meta.name');
              const nodeValue = get(node, 'model.value');
              // console.log('depend on:', depName, ' depend value:', depValue,
              // 'parentIsVisible:', parentIsVisible, ' parent Value', parentValue,
              // ' this name:', nodeName, ' caculated visible:', visible);
              if (nodeName) {
                traverseConditional(root, nodeName, nodeValue, visible);
              }
            }
          }
        }
      });
    };

    // console.log(thisName, thisValue);
    traverseConditional(this.m.wm.widgetTree, thisName, thisValue, true);
    // this.m.wm.printwidgetTree(true);
  }

  _checkValidation(node) {
    if (!node.model.visible) {
      // this.m._setModel({ errorMsg: '' }, node.model.instancePath, true);
      return '';
    }

    const validations = this.getValidations(node);
    let msg = '';
    if (validations) {
      const elementValue = node.model.value;
      // console.log(validations);
      const requiredFunc = validations['required'] || validations['object-key'];
      if (requiredFunc) {
        msg = requiredFunc(elementValue);
        if (msg) {
          this.m._setModel({ errorMsg: msg, invalid: !!msg }, node.model.instancePath, true);
          return msg;
        }
      } else if (elementValue === undefined || elementValue === '') {
        this.m._setModel({ errorMsg: '', invalid: true }, node.model.instancePath, true);
        return '';
      }

      Object.entries(validations).find(([ k, func ]) => { // eslint-disable-line
        // console.log(func, k, elementValue);
        try {
          msg = func(elementValue, name);
        } catch (e) {
          console.error(e.message);
        }
        // console.log('msg', msg, 'for element:', name, 'element value is:', elementValue, ' rule:', k);
        this.m._setModel({ errorMsg: msg, invalid: !!msg }, node.model.instancePath, true);
        return msg || false;
      });
    }
    return msg;
  }

  checkValidation() {
    return this._checkValidation(this.m.node);
  }

  /**
   * Check all sub elements valdation,
   * once has one element invalid, then stop submit
   */
  getSubmitErrors() {
    let errors = [];
    this.m.node.all((node) => {
      const errorMsg = this._checkValidation(node);
      if (errorMsg) {
        errors.push(`${node.model.meta.name} Catched Error, ${errorMsg}`);
      }
    });
    return  errors;
  }

}
