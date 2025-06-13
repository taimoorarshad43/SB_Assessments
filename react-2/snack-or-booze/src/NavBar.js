import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar() {

  // We'll have links to the drinks and snacks pages as ell as their add forms.

  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Snack or Booze
        </NavLink>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink exact to="/snacks">Snacks</NavLink>
          </NavItem>
          <NavItem>
            <NavLink exact to="/drinks">Drinks</NavLink>
          </NavItem>
          <NavItem>
            <NavLink exact to="/snacks/new">Add Snack</NavLink>
          </NavItem>
          <NavItem>
            <NavLink exact to="/drinks/new">Add Drink</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
