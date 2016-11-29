
import React, { Component } from 'react';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { Table,  Collapse } from 'react-bootstrap';

// import A10Button from 'components/Field/A10Button';
import TableHeader from './Libs/Table/Header';
import TableFooter from './Libs/Table/Footer';

class TableLayout extends Component {
  render() {
    const { tableAttrs, actions, pagination, tableOptions, ths, tds, newTd } = this.props;
    // console.log(tableOptions);
    return (
      <div>
        <TableHeader actions={actions} pagination={pagination} tableOptions={tableOptions} />

        <Table  {...tableAttrs} >
          <thead>
            <tr>
              {ths}
            </tr>
          </thead>

          <Collapse in={!!newTd} transitionAppear={true} timeout={3000}>
            <tbody>
              { newTd }
            </tbody>
          </Collapse>

          <tbody>
            {tds || 'loading...' }
          </tbody>
        </Table>
        <TableFooter  actions={actions} pagination={pagination} tableOptions={tableOptions} />
      </div>
    );
  }
}

export default TableLayout;
