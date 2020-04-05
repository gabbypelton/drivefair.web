import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { setBaseURL } from "./services/http";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router";
import Vendors from "./screens/customer/Vendors";
import CustomerLanding from "./screens/customer/Landing";
import VendorLanding from "./screens/vendor/Landing";
import ActiveOrders from "./screens/vendor/ActiveOrders";
import { Container, Col } from "reactstrap";

setBaseURL("http://localhost:5000");

function App() {
  return (
    <Container className="App">
      <Navbar />
      <Switch>
        <Route path="/customer/vendors" component={Vendors} />
        <Route path="/customer/landing" component={CustomerLanding} />
        <Route path="/vendor/landing" component={VendorLanding} />
        <Route path="/vendor/orders/active" component={ActiveOrders} />
        <Route path="/" component={CustomerLanding} />
      </Switch>
    </Container>
  );
}

export default App;
