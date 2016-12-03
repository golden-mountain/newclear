export Schema from './Schema';
import Schema from './Schema';
import { get } from 'lodash';

export class SchemaPlugin {
  _node = null

  onInitialize() {
    // console.log('executed initial at ModelPlugin', this.props, this.context);
    // this.model = new Model(this.cm, this.instancePath, this.props.dispatch);
    this._node = this.wm.getNode(this.instancePath);
    if (get(this._node, 'model.meta.schema')) {
      this._node.model.schemaParser = new Schema(this._node.model.meta.schema);
    } else {
      // find parent schema parser
      const _getParentSchemaParser = (node) => {
        if (node.parent && node.parent.model.schemaParser) {
          return node.parent.model.schemaParser;
        } else if (node.parent) {
          return _getParentSchemaParser(node.parent);
        } else {
          return null;
        }
      };

      this._node.model.schemaParser = _getParentSchemaParser(this._node);
    }

    if (this._node.model.schemaParser && this._node.model.meta.name) {
      if (!this._node.model.meta.conditional) {
        const conditional = this._node.model.schemaParser.getConditional(this._node.model.meta.name);
        // console.log(this.meta.name, conditional);
        if (conditional) {
          this._node.model.meta.conditional = conditional;
        }        
      }
      
      if (!this._node.model.meta.validation) {
        const validation = this._node.model.schemaParser.getValidations(this._node.model.meta.name);
        this._node.model.meta.validation = validation;
      }
    }

    // console.log(this._node.model);
  }


  onBeforeSetProps(previousProps) {
    // console.log('executed before set props at ModelPlugin', previousProps);
    return Object.assign(
      {},
      previousProps,
      {
        getSchema: () => {
          const model = this._node.model;
          if (model.schemaParser) {
            return model.schemaParser.schema;
          } else {
            return {};
          }
        }
      }
    );

  }

}
