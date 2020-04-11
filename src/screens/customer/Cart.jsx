import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row, Col, Button } from "../../components/styles";
import { toggleOrderMethod, toggleReadyToPay } from "../../actions/cart";
import { getVendors } from "../../actions/vendor";
import CartItem from "../../components/customer/CartItem";
import PaymentModal from "../../components/customer/payment/PaymentModal";

export class Cart extends Component {
  componentDidMount() {
    this.props.getVendors();
  }

  toggleOrderMethod(orderMethod) {
    this.props.toggleOrderMethod(orderMethod);
  }

  placeOrder() {
    this.props.toggleReadyToPay(true);
  }

  render() {
    if (!this.props.cartItems.length) {
      return (
        <Container>
          <br />
          <br />
          <Row>
            <Col>Your cart is empty!</Col>
          </Row>
        </Container>
      );
    }
    return (
      <Container>
        <Row style={{ justifyContent: "flex-end" }}>
          <Button color="link" onClick={() => this.props.history.goBack()}>
            Go Back
          </Button>
        </Row>
        <Row>
          <Col>Cart for {this.props.selectedVendor.businessName}</Col>
        </Row>
        <Row>
          {this.props.cartItems.map((cartItem) => {
            return <CartItem key={cartItem.key} cartItem={cartItem} />;
          })}
        </Row>
        <Row>
          <Col>
            <Button
              color="primary"
              active={this.props.orderMethod === "delivery"}
              onClick={() => this.toggleOrderMethod("delivery")}
            >
              Delivery
            </Button>
            <Button
              color="primary"
              active={this.props.orderMethod === "pickup"}
              onClick={() => this.toggleOrderMethod("pickup")}
            >
              Pickup
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color="primary" onClick={() => this.placeOrder()}>
              Place Order
            </Button>
          </Col>
        </Row>
        <PaymentModal />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
  selectedVendor: state.vendor.selectedVendor,
  orderMethod: state.cart.orderMethod
});

const mapDispatchToProps = {
  toggleOrderMethod,
  getVendors,
  toggleReadyToPay,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
