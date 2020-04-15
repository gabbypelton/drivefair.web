import React, { Component } from "react";
import { connect } from "react-redux";

import { Row, Col } from "../styles";

export class DisplayVendor extends Component {
  render() {
    const { businessName, phoneNumber, address } = this.props.vendor;
    return (
      <Row style={{ marginBottom: "2rem" }}>
        <Col>
          <Row>
            <Col>{businessName}</Col>
          </Row>
          <Row>
            <Col>{phoneNumber}</Col>
          </Row>
          <Row>
            <Col>
              {address.street} #{address.unit}
            </Col>
          </Row>
          <Row>
            <Col>
              {address.city}, {address.state} {address.zip}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayVendor);
