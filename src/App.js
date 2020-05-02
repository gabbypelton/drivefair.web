import React from "react";
import { connect } from "react-redux";
import { Switch, Route, useHistory, Redirect } from "react-router";
import { Container, Col, Spinner } from "reactstrap";

import "./App.css";
import { setBaseURL } from "./services/http";
import { loginWithToken } from "./actions/session";
import { getVendors } from "./actions/vendor";
import Navbar from "./components/Navbar";
import VendorLanding from "./screens/vendor/Landing";
import VendorActiveOrders from "./screens/vendor/ActiveOrders";
import VendorOrderHistory from "./screens/vendor/OrderHistory";
import CustomerLanding from "./screens/customer/Landing";
import CustomerActiveOrders from "./screens/customer/ActiveOrders";
import CustomerOrderHistory from "./screens/customer/OrderHistory";
import Menu from "./screens/customer/Menu";
import Cart from "./screens/customer/Cart";
import EditMenu from "./screens/vendor/EditMenu";
import Vendors from "./screens/customer/Vendors";

setBaseURL(process.env.REACT_APP_API_URL);

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
      ) : !props.isLoggedIn ? (
        <Switch>
          <Route path="/vendor" component={VendorLanding} />
          <Route path="/" component={CustomerLanding} />
        </Switch>
      ) : props.userType === "customer" ? (
        <Switch>
          <Route path="/orderHistory" component={CustomerOrderHistory} />
          <Route path="/vendors" component={Vendors} />
          <Route path="/activeOrders" component={CustomerActiveOrders} />
          <Route path="/cart" component={Cart} />
          <Route path="/menu" component={Menu} />
          <Route path="/" component={() => <Redirect to="/vendors" />} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/orderHistory" component={VendorOrderHistory} />
          <Route path="/activeOrders" component={VendorActiveOrders} />
          <Route path="/menu" component={EditMenu} />
          <Route path="/" component={() => <Redirect to="/activeOrders" />} />
        </Switch>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.session.isLoggedIn,
  isLoading: state.session.isLoading,
  userType: state.session.userType,
});

const mapDispatchToProps = {
  loginWithToken,
  getVendors,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
