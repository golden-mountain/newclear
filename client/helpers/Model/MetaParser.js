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
    this.initialConditional();
    // this.m.cm.printComponentTree(true);
  }

  getConditional() {
    let { conditional } = this.meta;
    // console.log('conditional', conditional);
    // find meta to get conditional
    // find schema to get conditional if meta.conditional not exists
    if (!conditional && this.model.schemaParser) {
      conditional = this.model.schemaParser.getConditional(this.meta.name);
      if (!conditional) {
        return false;
      }
    } else if (typeof conditional === 'string') {
      conditional = { [ conditional ] : true };
    }
    return conditional || false;
  }

  getValidations(node) {
    let { validation, name } = node.model.meta;
    if (!validation && node.model.schemaParser) {
      validation = node.model.schemaParser.getValidations(name);
    }
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

    if (conditional) {
      // register conditional
      const [ depName, depValue ] = Object.entries(conditional).pop();
      const depOnObjVisible = get(this.model.parent, 'model.visible', true);
      if (depOnObjVisible && depName) {
        const conditionalNode = this.m.cm.componentTree.first((node) => {
          return get(node.model, 'meta.name') === depName;
        });
        const conditionalObjValue = get(conditionalNode, 'model.value');
        // console.log(conditionalNode);

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
  }

  changeConditional() {
    const thisName = this.meta.name;
    const thisValue = this.m.getValue();

    const traverseConditional = (root, parentName, parentValue, parentIsVisible) => {
      root.walk((node) => {
        const conditional = get(node, 'model.meta.conditional');
        if (conditional) {
          const [ depName, depValue ] = Object.entries(conditional).pop();
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

    traverseConditional(this.m.cm.componentTree, thisName, thisValue, true);
    // this.m.cm.printComponentTree(true);
  }

  _checkValidation(node) {
    const validations = this.getValidations(node);
    if (validations) {
      let msg = '';

      const elementValue = node.model.value;
      // console.log(validations);
      const requiredFunc = validations['required'] || validations['object-key'];
      if (requiredFunc) {
        msg = requiredFunc(elementValue);
        this.m._setModel({ errorMsg: msg }, node.model.instancePath, true);
        return msg;
      }

      Object.entries(validations).forEach(([ k, func ]) => { // eslint-disable-line
        // console.log(func, k, elementValue);
        msg = func(elementValue, name);
        // console.log('msg', msg, 'for element:', name, 'element value is:', elementValue, ' rule:', k);
        this.m._setModel({ errorMsg: msg }, node.model.instancePath, true);
        return msg;
      });
    }
  }

  checkValidation() {
    return this._checkValidation(this.m.node);
  }

}
