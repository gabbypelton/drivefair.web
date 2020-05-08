import React, { Component } from "react";
import { connect } from "react-redux";

import { getMenu } from "../../actions/menu";
import MenuItem from "../../components/customer/MenuItem";
import { Container, Row, Col } from "../../components/styles";
import { Redirect } from "react-router";
import Searchbar from "../../components/MenuSearchBar";

export class Menu extends Component {
  componentDidMount() {
    this.props.getMenu(this.props.selectedVendor._id);
  }
  render() {
    const { selectedVendor, visibleMenuItems } = this.props;
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
          <Col>
            <Searchbar />
          </Col>
        </Row>
        <Row>
          {visibleMenuItems.map((menuItem) => (
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
  visibleMenuItems: state.menu.visibleMenuItems,
});

const mapDispatchToProps = {
  getMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
