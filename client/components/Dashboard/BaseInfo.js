import React from 'react';

function BaseInfo() {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>CPU</th>
          <th>Memory</th>
          <th>Disk Size</th>
          <th>CF</th>
          <th>SSL Card</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>18Pices</td>
          <td>10G</td>
          <td>Pri: 10G</td>
          <td>Pri: 1G</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>100Pices</td>
          <td></td>
          <td>Sec: 20G</td>
          <td>Sec: N/A</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}

export default BaseInfo;
