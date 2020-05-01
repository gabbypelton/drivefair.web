import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row, Col, Button } from "../../components/styles";
import { getActiveOrders, getCompletedOrders } from "../../actions/orders";
import ActiveOrder from "../../components/vendor/ActiveOrder";
import CompletedOrder from "../../components/vendor/CompletedOrder";

export class ActiveOrders extends Component {
  componentDidMount() {
    this.props.getActiveOrders();
    this.props.getCompletedOrders();
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
        {this.props.activeOrders.length ? (
          <div>
            <Row>
              <Col>
                <h4>Active Orders</h4>
              </Col>
            </Row>
            <Row>
              {this.props.activeOrders.map((activeOrder) => {
                return (
                  <ActiveOrder
                    key={activeOrder._id}
                    activeOrder={activeOrder}
                  />
                );
              })}
            </Row>
          </div>
        ) : (
          <Row>
            <h4>No Active Orders!</h4>
          </Row>
        )}
        {this.props.activeOrders.length ? (
          <div>
            <Row>
              <Col>
                <h4>Completed Orders</h4>
              </Col>
            </Row>
            <Row>
              {this.props.completedOrders.map((completedOrder) => {
                return (
                  <CompletedOrder
                    key={completedOrder._id}
                    completedOrder={completedOrder}
                  />
                );
              })}
            </Row>
          </div>
        ) : (
          <Row>
            <h4>No Completed Orders!</h4>
          </Row>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  activeOrders: state.orders.activeOrders,
  completedOrders: state.orders.completedOrders,
  user: state.session.profile,
});

const mapDispatchToProps = {
  getActiveOrders,
  getCompletedOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrders);
