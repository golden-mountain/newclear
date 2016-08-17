import React from 'react';
import { Link } from 'react-router/es6';
import './toolbar.scss';

export default () => (
  <nav className="navbar" role="navigation">
    <Link to="/">Home</Link>
    <Link to="/at">API Tester</Link>
    {sessionStorage.token && <Link to="/logout">Logout</Link>}
  </nav>
);
