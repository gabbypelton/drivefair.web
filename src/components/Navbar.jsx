import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { logout } from "../actions/session";

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const customer = {
    phrase: "No wait I'm a customer!",
    path: "/customer/landing",
  };
  const vendor = {
    phrase: "But I'm a vendor!",
    path: "/vendor/landing",
  };
  const switchTo = history.location.pathname.includes("vendor")
    ? customer
    : vendor;

  const toggle = () => setIsOpen(!isOpen);
  if (!props.isLoggedIn) {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"> </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href={switchTo.path}>{switchTo.phrase}</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>Now serving Denton, TX</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"> </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink onClick={() => props.logout()} href="/">
                Logout
              </NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            <NavItem>
              <NavLink href="javascript:history.back()">Go Back</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            <NavItem>
              <NavLink href="/cart">Cart</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.session.isLoggedIn,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
