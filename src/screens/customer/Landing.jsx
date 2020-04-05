import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Col, Row, Jumbotron, Button } from "reactstrap";
import AuthContainer from "../../components/customer/AuthContainer";

const Landing = (props) => {
  return (
    <div>
      <div style={{backgroundColor: "#F7F9FB"}}>
        <h1 className="display-3">Welcome to Delivery</h1>
        <p className="lead">Let's get you something to eat.</p>
        <p>Sign in order register for a new account below!</p>
        <p className="lead"></p>
      </div>
      <AuthContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
