import React, { Component } from "react";
import { connect } from "react-redux";

import { Row, Col } from "../styles";
import { formatImgurUrl } from "../../services/formatting";

export class DisplayVendor extends Component {
  render() {
    const { businessName, phoneNumber, address, logoUrl } = this.props.vendor;
    return (
      <Row style={{ marginBottom: "2rem" }}>
        <Col>
          <Row>
            <Col xs="6">
              <img style={{width: "50%"}}src={formatImgurUrl(logoUrl)} />
            </Col>
          </Row>
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
