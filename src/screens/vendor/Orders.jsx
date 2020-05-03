import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";

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

  render() {
    return (
      <Container>
        <OrderContainer
          {...this.props}
          orders={this.props.activeOrders}
          orderType={"Active"}
        />
        <OrderContainer
          {...this.props}
          orders={this.props.completedOrders}
          orderType={"Complete"}
        />
      </Container>
    );
  }
}

const OrderContainer = (props) => (
  <OrderList>
    <OrderListHeading>
      <h4>Order History</h4>
    </OrderListHeading>
    {props.isLoading ? (
      <OrderListBody>
        <Spinner />
      </OrderListBody>
    ) : props.orders.length ? (
      <OrderListBody>
        {props.orders.map((order) => (
          <Order
            key={order._id}
            order={order}
            orderType={props.orderType}
          />
        ))}
      </OrderListBody>
    ) : (
      <OrderListBody>
        <h5>None yet!</h5>
      </OrderListBody>
    )}
  </OrderList>
);

const Order = (props) =>
  props.orderType === "Active" ? (
    <ActiveOrder activeOrder={props.order} />
  ) : (
    <CompletedOrder completedOrder={props.order} />
  );

const mapStateToProps = (state) => ({
  activeOrders: state.orders.activeOrders,
  completedOrders: state.orders.completedOrders,
  user: state.session.profile,
  isLoading: state.orders.isLoading
});

const mapDispatchToProps = {
  getActiveOrders,
  getCompletedOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrders);
