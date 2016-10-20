import React from 'react';
import { Link } from 'react-router';
import { MenuItem, Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

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
        <NavItem href="/dev/apitester">API Tester</NavItem>
        <NavDropdown eventKey={3} title="ADC" id="basic-nav-dropdown">
          <MenuItem href="/adc/virtual-server/edit">Edit Virtual Server</MenuItem>
          <MenuItem href="/adc/virtual-server/list">Virtual Servers</MenuItem>
          <MenuItem href="/adc/virtual-server/port/edit">Virtual Port</MenuItem>
          <MenuItem href="/adc/template/virtual-server/edit">Virtual Server Template</MenuItem>
        </NavDropdown>
      </Nav>
      {sessionStorage.token && 
        <Nav pullRight>
          <NavItem href="/logout">Logout</NavItem>
        </Nav>
      }
      {children}
    </Navbar.Collapse>   
  </Navbar>
);
