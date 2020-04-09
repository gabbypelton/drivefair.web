import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";

import { selectVendor } from "../../actions/vendor";
import  MenuItem from "../../components/customer/MenuItem";
import { Link } from "../../components/styles";

export class Menu extends Component {
  componentDidMount() {
    this.props.selectVendor(this.props.match.params.vendorId);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.vendors.length && this.props.vendors.length) {
      this.props.selectVendor(this.props.match.params.vendorId);
    }
  }
  render() {
    const {
      menu,
      businessName,
      address,
      phoneNumber,
      _id,
    } = this.props.selectedVendor;
    return (
      <Container>
        <Row>
          <Link to="/customer/cart">Cart</Link>
        </Row>
        <Row>
          <Col>{businessName}</Col>
        </Row>
        <Row>
          <Col>{phoneNumber}</Col>
        </Row>
        <Row>
          <Col>{address.street}</Col>
        </Row>
        <Row>
          <Col>
            {address.city}, {address.state}
          </Col>
        </Row>
        {menu.map((menuItem) => (
          <MenuItem key={menuItem._id} menuItem={menuItem} />
        ))}
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
