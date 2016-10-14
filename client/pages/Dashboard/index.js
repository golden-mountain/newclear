import React from 'react';
// import auth from 'helpers/auth';
import Link from 'react-router/Link';

const Dashboard = React.createClass({
  render() {
    // const token = auth.getToken();

    return (
      <div className="container-fluid">
        <ul>
          <li><Link to="/adc/virtual-server/edit">Virtual Server Edit </Link></li>
          <li><Link to="/adc/virtual-server/port/edit">Virtual Port Edit </Link></li>
          <li><Link to="/adc/template/virtual-server/port/edit">Template Virtual Server Port Edit</Link></li>
        </ul>

      </div>
    );
  }
});

export default Dashboard;
