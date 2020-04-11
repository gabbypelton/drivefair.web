import React, { Component } from "react";
import { connect } from "react-redux";

import { selectVendor } from "../../actions/vendor";
import MenuItem from "../../components/customer/MenuItem";
import { Link, Container, Row, Col, Button } from "../../components/styles";
import { Redirect } from "react-router";

export class Menu extends Component {
  render() {
    const {
      menu,
      businessName,
      address,
      phoneNumber,
      _id,
    } = this.props.selectedVendor;
    if (!_id) return <Redirect to="/" />;
    return (
      <Container>
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
        <Row>
          {menu.map((menuItem) => (
            <MenuItem key={menuItem._id} menuItem={menuItem} />
          ))}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedVendor: state.vendor.selectedVendor,
  vendors: state.vendor.vendors,
});

const mapDispatchToProps = {
  selectVendor,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
