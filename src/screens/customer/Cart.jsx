import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row, Col, Button } from "../../components/styles";
import {
  toggleOrderMethod,
  toggleReadyToPay,
  getCart
} from "../../actions/cart";
import { getVendors } from "../../actions/vendor";
import CartItem from "../../components/customer/CartItem";
import PaymentModal from "../../components/customer/payment/PaymentModal";
import { formatPriceFromFloatString } from "../../services/formatting";

export class Cart extends Component {
  componentDidMount() {
    this.props.getVendors();
    this.props.getCart();
  }

  toggleOrderMethod(orderMethod) {
    this.props.toggleOrderMethod(orderMethod);
  }

  placeOrder() {
    this.props.toggleReadyToPay(true);
  }

  render() {
    if (!this.props.orderItems.length) {
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
        <Row>
          <br />
          <br />
          <Col>Cart for {this.props.selectedVendor.businessName}</Col>
        </Row>
        <Row>
          {this.props.orderItems.map((orderItem) => {
            return <CartItem key={orderItem._id} orderItem={orderItem} />;
          })}
        </Row>
        <Row>
          <Col>
            <Button
              color="primary"
              active={this.props.orderMethod === "DELIVERY"}
              onClick={() => this.toggleOrderMethod("DELIVERY")}
              buttonText="Delivery"
            />
            <Button
              color="primary"
              active={this.props.orderMethod === "PICKUP"}
              onClick={() => this.toggleOrderMethod("PICKUP")}
              buttonText="Pickup"
            />
          </Col>
        </Row>
        <Row>
          <Col>{formatPriceFromFloatString(this.props.totalPrice)}</Col>
        </Row>
        <Row>
          <Col>
            <Button
              color="primary"
              isLoading={this.props.isLoading}
              onClick={() => this.placeOrder()}
              buttonText="Place Order"
              isLoading={this.props.isLoading}
            />
          </Col>
        </Row>
        <PaymentModal />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  orderItems: state.cart.orderItems,
  selectedVendor: state.vendor.selectedVendor,
  orderMethod: state.cart.method,
  totalPrice: state.cart.total,
  isLoading: state.cart.isLoading
});

const mapDispatchToProps = {
  toggleOrderMethod,
  getVendors,
  getCart,
  toggleReadyToPay,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
