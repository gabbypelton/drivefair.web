import React, { Component } from "react";
import { connect } from "react-redux";

import CustomerLanding from "./customer/Landing";
import VendorLanding from "./vendor/Landing";
import { Row, Col } from "../components/styles";

export class RootLanding extends Component {
  render() {
    const { isLoggedIn, userType, emailIsConfirmed } = this.props;
    if (isLoggedIn && userType === "vendor") return <VendorLanding />;
    return <CustomerLanding />;
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.session.isLoggedIn,
  userType: state.session.userType,
  emailIsConfirmed: state.session.profile.emailIsConfirmed,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RootLanding);
