import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
  Badge,
} from "reactstrap";
import { logout } from "../actions/session";
import { NavLink } from "../components/styles";
import { colors } from "../constants/theme";

const AppNavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeOrders, readyOrders } = props;
  const orders = [...activeOrders, ...readyOrders];
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
        <Navbar dark expand="md">
          <NavbarBrand href="/"> </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavbarText>Now serving Denton, TX</NavbarText>
            </Nav>
            <Nav navbar>
              <NavItem>
                <NavLink href={switchTo.path}>{switchTo.phrase}</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  return (
    <div>
      <Navbar dark expand="md" style={{ margin: "0 0 0 0" }}>
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
                  <NavLink onClick={() => history.push("/cart")}>
                    Cart{" "}
                    {props.cartItems.length ? (
                      <Badge style={{ background: colors.primary500 }}>
                        {props.cartItems.length}
                      </Badge>
                    ) : null}
                  </NavLink>
                ) : (
                  <NavLink onClick={() => history.push("/editMenu")}>
                    Menu
                  </NavLink>
                )}
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Orders{" "}
                  {orders.length ? (
                    <Badge style={{ background: colors.primary500 }}>
                      {orders.length}
                    </Badge>
                  ) : null}
                </DropdownToggle>
                <DropdownMenu
                  right
                  style={{ backgroundColor: colors.background }}
                >
                  <DropdownItem>
                    <NavLink onClick={() => history.push("/orders")}>
                      Active{" "}
                      {activeOrders.length ? (
                        <Badge style={{ background: colors.primary500 }}>
                          {activeOrders.length}
                        </Badge>
                      ) : null}
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink onClick={() => history.push("/orders")}>
                      Ready{" "}
                      {readyOrders.length ? (
                        <Badge style={{ background: colors.primary500 }}>
                          {readyOrders.length}
                        </Badge>
                      ) : null}
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink onClick={() => history.push("/orderHistory")}>
                      History
                    </NavLink>
                  </DropdownItem>
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
  activeOrders: state.orders.activeOrders,
  readyOrders: state.orders.readyOrders,
  cartItems: state.cart.orderItems
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);
