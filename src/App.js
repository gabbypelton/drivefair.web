import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router";
import { Container, Col, Spinner } from "reactstrap";

import "./App.css";
import { setBaseURL } from "./services/http";
import { loginWithToken } from "./actions/session";
import { getVendors } from "./actions/vendor";
import { getActiveOrders } from "./actions/orders";
import Navbar from "./components/Navbar";
import VendorAuthContainer from "./screens/vendor/AuthContainer";
import VendorOrders from "./screens/vendor/Orders";
import VendorOrderHistory from "./screens/vendor/OrderHistory";
import CustomerAuthContainer from "./screens/customer/AuthContainer";
import CustomerOrders from "./screens/customer/Orders";
import CustomerOrderHistory from "./screens/customer/OrderHistory";
import ConfirmEmail from "./screens/ConfirmEmail";
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
  useEffect(() => {
    const { userType } = props;
    let getActiveOrders;
    if (userType === "vendor") {
      getActiveOrders = setInterval(() => props.getActiveOrders(), 60000);
    } else {
      clearInterval(getActiveOrders);
    }
  }, [props.userType]);
  return (
    <Container className="App">
      <Navbar />
      {props.isLoading ? (
        <Spinner />
      ) : !props.isLoggedIn ? (
        <Switch>
          <Route path="/vendor" component={VendorAuthContainer} />
          <Route path="/" component={CustomerAuthContainer} />
        </Switch>
      ) : !props.profile.emailIsConfirmed ? (
        <Switch>
          <Route path="/" component={ConfirmEmail} />
        </Switch>
      ) : props.userType === "customer" ? (
        <Switch>
          <Route path="/orderHistory" component={CustomerOrderHistory} />
          <Route path="/vendors" component={Vendors} />
          <Route path="/orders" component={CustomerOrders} />
          <Route path="/cart" component={Cart} />
          <Route path="/menu" component={Menu} />
          <Route path="/" component={() => <Redirect to="/vendors" />} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/orderHistory" component={VendorOrderHistory} />
          <Route path="/orders" component={VendorOrders} />
          <Route path="/editMenu" component={EditMenu} />
          <Route path="/" component={() => <Redirect to="/orders" />} />
        </Switch>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.session.isLoggedIn,
  isLoading: state.session.isLoading,
  userType: state.session.userType,
  profile: state.session.profile,
});

const mapDispatchToProps = {
  loginWithToken,
  getVendors,
  getActiveOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
