import React from "react";
import { connect } from "react-redux";
import { Switch, Route, useHistory } from "react-router";
import { Container, Col } from "reactstrap";

import "./App.css";
import { setBaseURL } from "./services/http";
import { loginWithToken } from "./actions/session";
import Navbar from "./components/Navbar";
import Vendors from "./screens/customer/Vendors";
import CustomerLanding from "./screens/customer/Landing";
import VendorLanding from "./screens/vendor/Landing";
import ActiveOrders from "./screens/vendor/ActiveOrders";

setBaseURL("http://localhost:5000");

function App(props) {
  const history = useHistory();
  const authToken = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");
  if (authToken &&  !props.isLoggedIn) {
    props.loginWithToken(authToken, userType);
  }

  if (props.isLoggedIn && history.location.pathname !== "/") {
    history.push("/");
  }

  return (
    <Container className="App">
      <Navbar />
      <Switch>
        <Route path="/customer/vendors" component={Vendors} />
        <Route path="/customer/landing" component={CustomerLanding} />
        <Route path="/vendor/landing" component={VendorLanding} />
        <Route path="/vendor/orders/active" component={ActiveOrders} />
        <Route
          path="/"
          component={props.isLoggedIn ? Vendors : CustomerLanding}
        />
      </Switch>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.session.isLoggedIn,
});

const mapDispatchToProps = {
  loginWithToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
