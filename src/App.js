import React from "react";
import { connect } from "react-redux";
import "./App.css";
import { setBaseURL } from "./services/http";
import Navbar from "./components/Navbar";
import { Switch, Route, useHistory } from "react-router";
import Vendors from "./screens/customer/Vendors";
import CustomerLanding from "./screens/customer/Landing";
import VendorLanding from "./screens/vendor/Landing";
import ActiveOrders from "./screens/vendor/ActiveOrders";
import { Container, Col } from "reactstrap";

setBaseURL("http://localhost:5000");

function App(props) {
  const history = useHistory();
  if (props.isLoggedIn && history.location.pathname !== "/") {
    history.push("/")
  }

  return (
    <Container className="App">
      <Navbar />
      <Switch>
        <Route path="/customer/vendors" component={Vendors} />
        <Route path="/customer/landing" component={CustomerLanding} />
        <Route path="/vendor/landing" component={VendorLanding} />
        <Route path="/vendor/orders/active" component={ActiveOrders} />
        <Route path="/" component={props.isLoggedIn ? Vendors : CustomerLanding} />
      </Switch>
    </Container>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn
});

export default connect(mapStateToProps)(App);
