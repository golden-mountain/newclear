
import React, { Component } from 'react';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { Table } from 'react-bootstrap';

// import A10Button from 'components/Field/A10Button';
import TableHeader from './Libs/Table/Header';
import TableFooter from './Libs/Table/Footer';

class TableLayout extends Component {
  render() {
    let { tableAttrs, actions, pagination, tableOptions, ths, tds, newTd } = this.props;
    // console.log(tableOptions);

    // if (!tds.length) {
    //   tds = <tr><td colSpan={ths.length}>Loading...</td></tr>;
    // }

    return (
      <div>
        <TableHeader actions={actions} pagination={pagination} tableOptions={tableOptions} />

        <Table  {...tableAttrs} >
          <thead>
            <tr>
              {ths}
            </tr>
          </thead>

          <tbody>
            { newTd }
            { tds }
          </tbody>
        </Table>
        <TableFooter  actions={actions} pagination={pagination} tableOptions={tableOptions} />
      </div>
    );
  }
}

export default TableLayout;
