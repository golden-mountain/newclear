import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { forEach, uniqueId } from 'lodash';

import './scss/Menu.scss';
const List = ({ children, className }) => {
  return <li className={ className }> { children } </li>;
};

export default class MenuLayout extends React.Component {

  generateMenu(menu) {
    // console.log(menu);
    let menuItems = [];
    forEach(menu, (menu, key) => {
      let menuItem = null;
      if (menu._path_) {
        menuItem = (<List key={uniqueId(key)}><Link to={menu._path_}>{key}</Link></List>);
      } else {
        menuItem = (
          <NavDropdown key={uniqueId(key)} eventKey={key} title={key} id="basic-nav-dropdown">
            { this.generateMenu(menu) }
          </NavDropdown>
        );
      }
      menuItems.push(menuItem);
    });

    return menuItems;
  }

  render() {
    const { children, menu } = this.props;
    return (<Navbar inverse fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Home</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          { this.generateMenu(menu) }
        </Nav>
        {sessionStorage.token &&
          <Nav pullRight>
            <List><Link to="/auth/logout">Logout</Link></List>
          </Nav>
        }
        {children}
      </Navbar.Collapse>
    </Navbar>);
  }
}
