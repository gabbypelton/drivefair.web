import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Container,
  Row,
  OrderList,
  OrderListHeading,
  OrderListBody,
} from "../../components/styles";
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
        <OrderList>
          <OrderListHeading>
            <h4>Active Orders</h4>
          </OrderListHeading>
          {this.props.activeOrders.length ? (
            <OrderListBody>
              {this.props.activeOrders.map((activeOrder) => {
                return (
                  <ActiveOrder
                    key={activeOrder._id}
                    activeOrder={activeOrder}
                  />
                );
              })}
            </OrderListBody>
          ) : (
            <OrderListBody>
              <h5>No Active Orders!</h5>
            </OrderListBody>
          )}
        </OrderList>
        {this.props.completedOrders.length ? (
          <OrderList>
            <OrderListHeading xs="12">
              <h4>Completed Orders</h4>
            </OrderListHeading>
            <OrderListBody>
              {this.props.completedOrders.map((completedOrder) => {
                return (
                  <CompletedOrder
                    key={completedOrder._id}
                    completedOrder={completedOrder}
                  />
                );
              })}
            </OrderListBody>
          </OrderList>
        ) : (
          <OrderList>
            <OrderListHeading xs="12">
              <h4>No Completed Orders!</h4>
            </OrderListHeading>
          </OrderList>
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
