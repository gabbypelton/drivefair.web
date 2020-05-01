import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row, Col, Button } from "../../components/styles";
import { getOrderHistory } from "../../actions/orders";
import OrderHistoryItem from "../../components/vendor/OrderHistoryItem";

export class ActiveOrders extends Component {
  componentDidMount() {
    this.props.getOrderHistory();
  }

  toggleOrderMethod(orderMethod) {
    this.props.toggleOrderMethod(orderMethod);
  }

  placeOrder() {
    this.props.toggleReadyToPay(true);
  }

  render() {
    return (
      <Container>
        {this.props.orderHistory.length ? (
          <div>
            <Row>
              <Col>
                <h4>Order History</h4>
              </Col>
            </Row>
            <Row>
              {this.props.orderHistory.map((orderHistoryItem) => {
                return (
                  <OrderHistoryItem
                    key={orderHistoryItem._id}
                    orderHistoryItem={orderHistoryItem}
                  />
                );
              })}
            </Row>
          </div>
        ) : (
          <Row>
            <h4>No Orders!</h4>
          </Row>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  orderHistory: state.orders.orderHistory,
  completedOrders: state.orders.completedOrders,
  user: state.session.profile,
});

const mapDispatchToProps = {
  getOrderHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrders);
