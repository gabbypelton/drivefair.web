import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";

import CartItem from "../../components/customer/CartItem";

export class Cart extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>Cart for {this.props.selectedVendor.businessName}</Col>
        </Row>
        <Row>
          {this.props.cartItems.map((cartItem) => {
            return <CartItem  key={cartItem.key} cartItem={cartItem} />;
          })}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
  selectedVendor: state.vendor.selectedVendor,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
