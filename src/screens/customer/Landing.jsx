import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Col, Row, Jumbotron, Button } from "reactstrap";
import AuthContainer from "../../components/customer/auth/AuthContainer";
import Vendors from "./Vendors";

const Landing = (props) => {
  return (
    <div>
      {props.isLoggedIn ? <Vendors/> : <AuthContainer />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.session.isLoggedIn
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
