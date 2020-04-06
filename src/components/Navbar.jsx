import React, { useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';


const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const customer = {
    phrase: "No wait I'm a customer!",
    path: "/customer/landing"
  }
  const vendor = {
    phrase: "But I'm a vendor!",
    path: "/vendor/landing"
  }
  const switchTo = history.location.pathname.includes("vendor") ? customer : vendor;

  const toggle = () => setIsOpen(!isOpen);

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

const mapStateToProps = (state) => ({
  isLoggedIn: state.session.isLoggedIn
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Example)
