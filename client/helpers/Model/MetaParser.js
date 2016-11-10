import { get } from 'lodash';

export default class MetaParser {

  constructor(modelObject) {
    // Model Object instance
    this.m = modelObject;
    // alias to parent node model
    this.model = modelObject.node.model;
    // alias to parent model meta
    this.meta = this.model.meta;
  }

  initialize() {
    this.initialConditional();
  }

  getConditional() {
    let { conditional } = this.meta;
    // console.log('conditional', conditional);
    // find meta to get conditional
    // find schema to get conditional if meta.conditional not exists
    if (!conditional && this.model.schemaParser) {
      conditional = this.model.schemaParser.getConditional(this.meta.name);
      if (!conditional) {
        return true;
      }
    } else if (typeof conditional === 'string') {
      conditional = { [ conditional ] : true };
    }
    return conditional;
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
          return node.model.meta && node.model.meta.name === depName;
        });
        const conditionalObjValue = conditionalNode.model.value;
        // console.log(conditionalNode, depValue, conditionalObjValue);

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

    // console.log(this.meta.name, isVisible);
    // let initialState = { invalid: !isVisible, visible: isVisible };
    // this.m.setModel(initialState, true);
    // this.m._syncDataToRedux(initialState);
    this.m.setVisible(isVisible);
  }

  changeConditional() {
    console.log('.....change conditional');
    this.m.cm.componentTree.walk((node) => {
      console.log(node);
      const thisName = this.meta.name;
      const nodeName = get(node, 'model.meta.name');
      const condValue = get(node, `model.meta.conditional.${thisName}`);
      if (thisName == nodeName) {
        const visible = this._isElementVisible(this.model.value, condValue);
        this.m.setVisible(visible);
      }
    });
  }


}
