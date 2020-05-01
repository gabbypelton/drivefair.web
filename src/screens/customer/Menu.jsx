import React, { Component } from "react";
import { connect } from "react-redux";

import { getMenu } from "../../actions/menu";
import MenuItem from "../../components/customer/MenuItem";
import { Link, Container, Row, Col, Button } from "../../components/styles";
import { Redirect } from "react-router";

export class Menu extends Component {
  componentDidMount() {
    this.props.getMenu(this.props.selectedVendor._id);
  }
  render() {
    const { selectedVendor, menuItems } = this.props;
    const { businessName, address, phoneNumber, _id } = selectedVendor;
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
          {menuItems.map((menuItem) => (
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
  menuItems: state.menu.menuItems,
});

const mapDispatchToProps = {
  getMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
