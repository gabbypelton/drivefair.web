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
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { logout } from "../actions/session";
import { NavLink } from "../components/styles";

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const customer = {
    phrase: "No wait I'm a customer!",
    path: "/",
  };
  const vendor = {
    phrase: "But I'm a vendor!",
    path: "/vendor",
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
              <NavLink onClick={() => history.push("/")}>Home</NavLink>
            </NavItem>
          </Nav>
          {props.emailIsConfirmed ? (
            <Nav navbar>
              <NavItem>
                {props.userType === "customer" ? (
                  <NavLink onClick={() => history.push("/cart")}>Cart</NavLink>
                ) : (
                  <NavLink onClick={() => history.push("/editMenu")}>
                    Menu
                  </NavLink>
                )}
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Orders
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink onClick={() => history.push("/orders")}>Active</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink onClick={() => history.push("/orderHistory")}>
                      History
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          ) : null}
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.session.isLoggedIn,
  userType: state.session.userType,
  emailIsConfirmed: state.session.profile.emailIsConfirmed,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
