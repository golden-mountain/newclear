import React from 'react';
import { Link } from 'react-router';
import './scss/Menu.scss';

export default () => (
  <nav className="navbar" role="navigation">
    <Link to="/">Dashboard</Link>
    <Link to="/dev/apitester">API Tester</Link>
    <Link to="/adc/virtual-server/edit">Edit Virtual Server</Link>
    <Link to="/adc/virtual-server/list">Virtual Servers</Link>
    {sessionStorage.token && <Link to="/logout">Logout</Link>}
  </nav>
);
