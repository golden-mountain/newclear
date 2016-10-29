import React from 'react';
// import auth from 'helpers/auth';
import Link from 'react-router/Link';

const SLBDashboard = React.createClass({
  render() {
    // const token = auth.getToken();

    return (
      <div className="container-fluid">
        <ul>
          <li><Link to="/adc/virtual-server/edit">Virtual Server Edit </Link></li>
          <li><Link to="/adc/virtual-port/edit">Virtual Port Edit </Link></li>
          <li><Link to="/adc/template-virtual-server/edit">Template Virtual Server Port Edit</Link></li>
        </ul>

      </div>
    );
  }
});

export default SLBDashboard;
