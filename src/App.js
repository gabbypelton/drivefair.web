import React from "react";
import { connect } from "react-redux";
import { Switch, Route, useHistory } from "react-router";
import { Container, Col, Spinner } from "reactstrap";

import "./App.css";
import { setBaseURL } from "./services/http";
import { loginWithToken } from "./actions/session";
import { getVendors } from "./actions/vendor";
import Navbar from "./components/Navbar";
import Vendors from "./screens/customer/Vendors";
import CustomerLanding from "./screens/customer/Landing";
import VendorLanding from "./screens/vendor/Landing";
import ActiveOrders from "./screens/vendor/ActiveOrders";
import Menu from "./screens/customer/Menu";
import Cart from "./screens/customer/Cart";

setBaseURL("http://localhost:5000");

function App(props) {
  const authToken = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");
  if (authToken && !props.isLoggedIn && !props.isLoading) {
    props.loginWithToken(authToken, userType);
  }
  return (
    <Container className="App">
      <Navbar />
      {props.isLoading ? (
        <Spinner />
      ) : (
        <Switch>
          <Route path="/customer/vendors" component={Vendors} />
          <Route path="/customer/landing" component={CustomerLanding} />
          <Route path="/cart" component={Cart} />
          <Route path="/vendor/landing" component={VendorLanding} />
          <Route path="/vendor/orders/active" component={ActiveOrders} />
          <Route path="/customer/menu" component={Menu} />
          <Route
            path="/"
            component={props.isLoggedIn ? Vendors : CustomerLanding}
          />
        </Switch>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.session.isLoggedIn,
  isLoading: state.session.isLoading,
});

const mapDispatchToProps = {
  loginWithToken,
  getVendors,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
