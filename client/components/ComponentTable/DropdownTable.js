import React, {Component, PropTypes} from 'react';

class DropdownTable extends Component {
  static propTypes = {
    header: PropTypes.array.isRequired// , bodyKey: PropTypes.string.isRequired, dataList: PropTypes.array.isRequired
  }

  renderBody(data) {
    console.log(data);
  }

  renderHeader(header) {
    const head = [];
    const subHead = [];

    header.forEach((column, columnIndex) => {

      let colspan = 0;

      if (column.hasOwnProperty('subHeader')) {
        colspan = column.subHeader.length || 0;
        head.push( (<th key={'column-' + columnIndex} colSpan={colspan}>{ column.label }</th>) );

        column.subHeader.forEach((subColumn, subColumnIndex) => {
          subHead.push( (<th key={column.label + '-' + subColumnIndex}>{ subColumn.label }</th>) );
        });

      } else {
        head.push( (<th key={'head-' + columnIndex} rowSpan="2">{ column.label }</th>) );
      }

    });

    return (
      <thead>
        <tr>
          {head}
        </tr>
        <tr>
          {subHead}
        </tr>
      </thead>);
  }

  render() {

    const {
      header// , bodyKey, dataList
    } = this.props;

    return (
      <table className="table table-bordered">
        {this.renderHeader(header)}
      </table>
    );
  }
}

export default DropdownTable;
