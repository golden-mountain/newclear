import React, { Component } from 'react';
import { FieldArray } from 'redux-form/immutable'; // imported Field
import { Button, Table } from 'react-bootstrap';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { forEach, isObject, upperFirst } from 'lodash';

import { widgetWrapper } from 'helpers/widgetWrapper';
import A10Button from 'components/Form/A10Button';
// import { A10SchemaField } from 'components/Form/A10Field';

class TableFields extends Component {
  static displayName = 'TableFields'

  _changeKidsConditional(prefix, conditional) {
    if (!isObject(conditional)) return conditional;
    let cond = {};
    forEach(conditional, (value, name) => {
      cond[`${prefix}.${name}`] = value;
    });
    return cond;
  }

  _mapKidsToCol(prefix) {
    return (child, index) => {
      const fullName = `${prefix}.${child.props.name}`;
      const conditional = this._changeKidsConditional(prefix, child.props.conditional);
      const newKids = React.cloneElement(child, { name: fullName, conditional });
      return (<td key={index}> {newKids} </td>);
    };
  }

  _extractTitles(kids) {
    return kids.map((child, index) => {
      return (<td key={index}> {child.props.title || upperFirst(child.props.name) } </td>);
    });
  }

  _inlineCreate(fields, kids) {
    return () => {
      let newFields = fields;
      let proto = {};
      kids.forEach((kid) => {
        const name = kid.props.name;
        proto[name] = '';
      });
      newFields.push(proto);
      // console.log(newFields);
      return newFields;
    };
  }

  render() {
    const { fields, meta: { touched, error }, popupInfo, kids } = this.props;

    // console.log('popup info:', popupInfo);
    return (
      <div>
        <div className="pull-right">
          <Button onClick={this._inlineCreate(fields, kids)} bsStyle="primary">
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> New
          </Button>

          { popupInfo && <A10Button bsStyle="default" popup={ popupInfo }>Create...</A10Button> }

          {touched && error && <span>{error}</span>}
        </div>

        <Table responsive>
          <thead>
            <tr>
              { this._extractTitles(kids) }
            </tr>
          </thead>
          <tbody>
          {
            fields.map((port, index) => {
              // console.log('port:', port, index);
              return (
                <tr key={index} >
                { kids.map(::this._mapKidsToCol(port)) }
              </tr>);
            })
          }
          </tbody>
        </Table>
        {touched && error && <span>{error}</span>}
      </div>

    );
  }
}


class A10MultiField extends Component {
  static displayName = 'A10MultiField'

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { component, name, children, ...rest } = this.props;
    // console.log('rest.............', this.props);
    // TODO: schema need used for cleaning data

    if (!component) {
      component = TableFields;
    }

    return (
      <FieldArray component={component} kids={children} name={name} { ...rest } />
    );
  }
}

export default widgetWrapper()(A10MultiField);
