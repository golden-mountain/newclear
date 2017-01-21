import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
// import { FieldArray } from 'redux-form/immutable'; // imported Field
import { Button, Table, Row, Col, InputGroup, FormControl, Pagination } from 'react-bootstrap';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { forEach, isObject, upperFirst } from 'lodash';

import { widgetWrapper } from '../../../widgetWrapper';
import { A10Button } from './A10Button';
// import { A10SchemaField } from 'components/Form/A10Field';

import './assets/a10multifield.scss';

class TableFields extends Component {
  static displayName = 'TableFields'

  static propTypes = {
    kids: PropTypes.array.isRequired,
    popupInfo: PropTypes.object,
    errorMsg: PropTypes.string,
    primaryKey: PropTypes.any
  }

  constructor(props) {
    super(props);
    this.displayLimit = 10;
    this.state = {
      data: [],
      currentPage:1,
      keyword: null 
    };
  }

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

  _inlineCreate(data, kids) {
    return () => {      
      let proto = {};
      kids.forEach((kid) => {
        const name = kid.props.name;
        proto[name] = '';
      });

      this.setState({
        data: [ proto, ...data ],
        currentPage: 1
      });
    };
  }

  _changePage = pageNumber => {
    this.setState({ currentPage: pageNumber });
  }

  _renderItem(kids, data, index) {
    const { primaryKey } = this.props;

    const items = [];
    for (let i = 0; i < kids.length; i++) {
      const child = kids[i];
      let { name, conditional } = child.props;
      const value = data[name] + '';

      if (primaryKey) {
        const prefix = data[primaryKey];
        if (name.length) name = `${prefix}.${name}`;
        conditional = this._changeKidsConditional(prefix, conditional);
      } 

      items.push((
        <td key={`${Date.now()}-${i}`}> 
          { 
            React.cloneElement(child, {
              name,
              conditional,
              value
            }) 
          } 
        </td>
      ));
    }
   
    return <tr key={index}>{items}</tr>;
  }

  _renderItemRow(items) {
    const { kids } = this.props;
    const { currentPage } = this.state;
    const startPos = (currentPage - 1) * this.displayLimit;

    const rows = [];
    for (let i = startPos; rows.length < this.displayLimit && i < items.length; i++) {
      const item = this._renderItem(kids, items[i], i);
      rows.push(item);
    }
    return rows;
  }

  _renderPagination(data) {
    const totalPage = Math.ceil(data.length / this.displayLimit);

    if (totalPage === 0) return null;
    return (
      <Col lg={ 12 } className="text-right">
        <Pagination prev next items={totalPage} 
          maxButtons={3} 
          onSelect={this._changePage} 
          activePage={this.state.currentPage}
          bsSize="small" />
      </Col>
    );
  }

  _updateFilter = () => {
    const { kids, activeData } = this.props;
    const data = activeData ? activeData.toJS() : [];
    const keyword = ReactDOM.findDOMNode(this.refs.search).value;

    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let hasSearch = false;
      for (let j = 0; j < kids.length; j++) {
        const child = kids[j];
        const { searchable, name } = child.props;
        const value = data[i][name] + '';
        if (searchable) hasSearch = true;
        if (searchable && value.indexOf(keyword) >= 0) {
          newData.push(data[i]);
          break;
        }
      }
      if (!hasSearch) newData.push(data[i]);
    }

    this.setState({ 
      keyword, 
      currentPage: 1, 
      data: newData 
    });
  }

  _setDisplayData() {
    const { activeData } = this.props;
    this.setState({
      data: activeData ? activeData.toJS() : []
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeData !== this.props.activeData) {
      this._setDisplayData();
    }
  }

  componentDidMount() {
    this._setDisplayData();
  }

  render() {
    const { errorMsg, popupInfo, kids } = this.props;
    const { data } = this.state;

    return (
      <div>
        <Row>
          <Col md={6} >
            <div>
              <InputGroup>
                <FormControl ref="search" type="text" placeholder="Keywords" />
                <InputGroup.Button>
                  <Button bsStyle="default" onClick={this._updateFilter}>Search</Button>
                </InputGroup.Button>
              </InputGroup>
            </div>
          </Col>
          <Col md={6} className="text-right">
            <Button onClick={this._inlineCreate(data, kids)} bsStyle="primary">
              <span className="fa fa-plus" aria-hidden="true"></span> New
            </Button>

            { popupInfo && <A10Button bsStyle="default" popup={ popupInfo }>Create...</A10Button> }

            {<span>{errorMsg}</span>}
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Table responsive striped hover className="port-list-container">
              <thead>
                <tr>
                  { this._extractTitles(kids) }
                </tr>
              </thead>
              <tbody>
                { this._renderItemRow(data) }
              </tbody>
            </Table>
          </Col>
        </Row>

        <div className="panel-footer">
          <Row>
            { this._renderPagination(data) }
          </Row>
        </div>
      </div>

    );
  }
}


class _A10MultiField extends Component {
  static displayName = 'A10MultiField'

  static propTypes = {
    children: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    listComponent: PropTypes.element
  }

  static defaultPropTypes = {
    children: []
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { listComponent, name, children, ...rest } = this.props;

    // clean data and find the primary key
    let primaryKey = null;
    const startPos = name.indexOf('.');
    let data = this.props.modelGetSchema().properties;
    let dataAttrName = startPos != -1 ? name.substring(startPos + 1, name.length) : name;
    if (data && data.hasOwnProperty(dataAttrName))
      data = data[dataAttrName];

    // const schema = data ? data.properties : {};
    // const kids = [];
    // for (let i = 0; i < children.length; i++) {
    //   const child = children[i];
    //   const { name, primary } = child.props;
    //   if (!primaryKey && primary) primaryKey = name;
    //   if (schema[name]) kids.push(child);
    // }

    if (!listComponent) {
      listComponent = TableFields;
    }

    return (
      <TableFields kids={children} name={name} primaryKey={primaryKey} { ...rest } />
    );
  }
}

export const A10MultiField = widgetWrapper([ 'app' ])(_A10MultiField);
