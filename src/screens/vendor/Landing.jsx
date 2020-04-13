import React, { Component } from "react";
import { connect } from "react-redux";
import AuthContainer from "../../components/vendor/auth/AuthContainer";
import ActiveOrders from "./ActiveOrders";

const Landing = props => {
  return (
    <div>
      {props.isLoggedIn ? <ActiveOrders /> : <AuthContainer />}
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
