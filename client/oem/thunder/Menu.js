import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// import './scss/Menu.scss';
const List = ({ children, className }) => {
  return <li className={ className }> { children } </li>;
};

export default ({ children }) => (
 <Navbar inverse fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Dashboard</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <List><Link to="/dev/apitester">API Tester</Link></List>
        <NavDropdown eventKey={3} title="ADC" id="basic-nav-dropdown">
          <List><Link to="/adc/virtual-server/edit">Edit Virtual Server</Link></List>
          <List><Link to="/adc/virtual-server/list">Virtual Servers</Link></List>
          <List><Link to="/adc/virtual-port/edit">Virtual Port</Link></List>
          <List><Link to="/adc/template-virtual-server/edit">Virtual Server Template</Link></List>
        </NavDropdown>
      </Nav>
      {sessionStorage.token &&
        <Nav pullRight>
          <List><Link to="/auth/logout">Logout</Link></List>
        </Nav>
      }
      {children}
    </Navbar.Collapse>
  </Navbar>
);
