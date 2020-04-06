import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";

export class Vendors extends Component {
  render() {
    return (
      <Container>
        <Row>Sup</Row> <Row>Sup</Row> <Row>Sup</Row> <Row>Sup</Row>
        <Row>Sup</Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Vendors);
