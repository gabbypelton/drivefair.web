import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Col, Row } from "reactstrap";

export class Landing extends Component {
  render() {
    return <Row></Row>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
