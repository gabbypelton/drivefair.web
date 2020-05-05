import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Container,
  Row,
  Col,
  Button,
  Label,
  Input,
  SmallButton,
} from "../../components/styles";
import {
  toggleOrderMethod,
  toggleReadyToPay,
  getCart,
  setTip,
} from "../../actions/cart";
import { getVendors } from "../../actions/vendor";
import CartItem from "../../components/customer/CartItem";
import PaymentModal from "../../components/customer/payment/PaymentModal";
import { formatPriceFromFloatString } from "../../services/formatting";
import { InputGroupAddon, InputGroupText, InputGroup } from "reactstrap";

export class Cart extends Component {
  state = {
    tip: "0.00",
    total: "",
  };

  componentDidMount() {
    this.props.getVendors();
    this.props.getCart();
    this.setState({
      total: parseFloat(this.props.totalPrice) + parseFloat(this.state.tip),
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.totalPrice !== prevProps.totalPrice) {
      this.setState({
        total: parseFloat(this.props.totalPrice) + parseFloat(this.state.tip),
      });
    } if (prevProps.orderItems.length && !this.props.orderItems.length) {
      this.props.history.push("/orders")
    }
  }

  toggleOrderMethod(orderMethod) {
    this.props.toggleOrderMethod(orderMethod);
  }

  placeOrder() {
    this.props.setTip(this.state.tip);
    this.props.toggleReadyToPay(true);
  }

  updateTip(value) {
    this.setState({
      tip: value,
      total: parseFloat(this.props.totalPrice) + parseFloat(value),
    });
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
          <Col>
            <h4>Cart for {this.props.selectedVendor.businessName}</h4>
          </Col>
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
          <Col>Total: {formatPriceFromFloatString(this.state.total)}</Col>
        </Row>
        <Row>
          <Col xs="6" md="4">
            <Row>
              <Col xs="3">
                <Label to="tip">Tip: </Label>
              </Col>
              <Col xs="12">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="tip"
                    value={this.state.tip}
                    onChange={(e) => this.updateTip(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <SmallButton
                  onClick={() =>
                    this.updateTip((this.props.totalPrice * 0.15).toFixed(2))
                  }
                >
                  15%
                </SmallButton>
              </Col>
              <Col xs="6">
                <SmallButton
                  onClick={() =>
                    this.updateTip((this.props.totalPrice * 0.2).toFixed(2))
                  }
                >
                  20%
                </SmallButton>
              </Col>
            </Row>
          </Col>
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
  isLoading: state.cart.isLoading,
});

const mapDispatchToProps = {
  toggleOrderMethod,
  getVendors,
  getCart,
  toggleReadyToPay,
  setTip,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
