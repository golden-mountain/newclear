import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

import './scss/Menu.scss';

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
        <NavItem><Link to="/dev/apitester">API Tester</Link></NavItem>
        <NavDropdown eventKey={3} title="ADC" id="basic-nav-dropdown">
          <NavItem><Link to="/adc/virtual-server/edit">Edit Virtual Server</Link></NavItem>
          <NavItem><Link to="/adc/virtual-server/list">Virtual Servers</Link></NavItem>
          <NavItem><Link to="/adc/virtual-server/port/edit">Virtual Port</Link></NavItem>
          <NavItem><Link to="/adc/template/virtual-server/edit">Virtual Server Template</Link></NavItem>
        </NavDropdown>
      </Nav>
      {sessionStorage.token && 
        <Nav pullRight>
          <NavItem><Link to="/logout">Logout</Link></NavItem>
        </Nav>
      }
      {children}
    </Navbar.Collapse>   
  </Navbar>
);
