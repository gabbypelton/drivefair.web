import React, { Component } from "react";
import { connect } from "react-redux";

import CustomerLanding from "./customer/Landing";
import VendorLanding from "./vendor/Landing";

export class RootLanding extends Component {
  render() {
    const { isLoggedIn, userType } = this.props;
    if (isLoggedIn && userType === "vendor") return <VendorLanding />;
    return <CustomerLanding />;
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  userType: state.session.userType
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RootLanding);
