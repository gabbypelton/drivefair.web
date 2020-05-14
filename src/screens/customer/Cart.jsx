import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Container,
  Row,
  Col,
  Button,
  Label,
  Input,
} from "../../components/styles";
import {
  toggleOrderMethod,
  toggleReadyToPay,
  getCart,
  setTip,
} from "../../actions/cart";
import { getVendors } from "../../actions/vendor";
import CartItem from "../../components/customer/CartItem";
import CheckoutModal from "../../components/customer/checkout/CheckoutModal";
import { formatPriceFromFloatString } from "../../services/formatting";
import {
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  ButtonGroup,
} from "reactstrap";

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
    }
    if (prevProps.orderItems.length && !this.props.orderItems.length) {
      this.props.history.push("/orders");
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
          <Col xs="10" md="6" lg="3">
            <ButtonGroup>
              <Button
                isLoading={this.props.isLoading}
                selected={this.props.orderMethod === "DELIVERY"}
                onClick={() => this.toggleOrderMethod("DELIVERY")}
                title="Delivery"
              />
              <Button
                isLoading={this.props.isLoading}
                selected={this.props.orderMethod === "PICKUP"}
                onClick={() => this.toggleOrderMethod("PICKUP")}
                title="Pickup"
              />
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="10" md="6" lg="3">
            <Row>
              <Col xs="2">
                <Label to="tip">Tip: </Label>
              </Col>
              <Col xs="8">
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
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col>
                <ButtonGroup>
                  <Button
                    title="15%"
                    onClick={() =>
                      this.updateTip((this.props.totalPrice * 0.15).toFixed(2))
                    }
                  />
                  <Button
                    title="20%"
                    onClick={() =>
                      this.updateTip((this.props.totalPrice * 0.2).toFixed(2))
                    }
                  />
                </ButtonGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>Total: {formatPriceFromFloatString(this.state.total)}</Col>
        </Row>
        <Row>
          <Col>
            <Button
              isLoading={this.props.isLoading}
              onClick={() => this.placeOrder()}
              title="Place Order"
              isLoading={this.props.isLoading}
            />
          </Col>
        </Row>
        <CheckoutModal />
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
