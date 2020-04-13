import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row, Col, Button } from "../../components/styles";
import { getActiveOrders } from "../../actions/orders";
import ActiveOrder from "../../components/vendor/ActiveOrder";
import { formatPriceFromFloatString } from "../../services/formatting";

export class ActiveOrders extends Component {
  componentDidMount() {
    this.props.getActiveOrders();
  }

  toggleOrderMethod(orderMethod) {
    this.props.toggleOrderMethod(orderMethod);
  }

  placeOrder() {
    this.props.toggleReadyToPay(true);
  }

  render() {
    if (!this.props.activeOrders.length) {
      return (
        <Container>
          <br />
          <br />
          <Row>
            <Col>No active orders!</Col>
          </Row>
        </Container>
      );
    }
    return (
      <Container>
        <Row>
          <br />
          <br />
          <Col>Active orders for {this.props.user.businessName}</Col>
        </Row>
        <Row>
          {this.props.activeOrders.map((activeOrder) => {
            return (
              <ActiveOrder key={activeOrder._id} activeOrder={activeOrder} />
            );
          })}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  activeOrders: state.orders.activeOrders,
  user: state.session.profile,
});

const mapDispatchToProps = {
  getActiveOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrders);
