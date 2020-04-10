import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row, Col, Button } from "../../components/styles";
import { sendOrder } from "../../actions/cart";
import CartItem from "../../components/customer/CartItem";

export class Cart extends Component {
  state = {
    method: "pickup",
  };
  chooseMethod(method) {
    this.setState({
      method,
    });
  }

  placeOrder() {
    this.props.sendOrder(
      this.props.cartItems,
      this.props.selectedVendor._id,
      this.state.method
    );
  }

  render() {
    return (
      <Container>
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
              active={this.state.method === "delivery"}
              onClick={() => this.chooseMethod("delivery")}
            >
              Delivery
            </Button>
            <Button
              color="primary"
              active={this.state.method === "pickup"}
              onClick={() => this.chooseMethod("pickup")}
            >
              Pickup
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color="primary" onClick={() => this.placeOrder()}>Place Order</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
  selectedVendor: state.vendor.selectedVendor,
});

const mapDispatchToProps = {
  sendOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
