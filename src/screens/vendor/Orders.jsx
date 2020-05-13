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
import { getActiveOrders, getReadyOrders } from "../../actions/orders";
import ActiveOrder from "../../components/vendor/ActiveOrder";
import ReadyOrder from "../../components/vendor/ReadyOrder";

export class ActiveOrders extends Component {
  componentDidMount() {
    this.props.getActiveOrders();
    this.props.getReadyOrders();
  }

  render() {
    return (
      <Container>
        <OrderListContainer
          {...this.props}
          orders={this.props.activeOrders}
          orderType={"Active"}
        />
        <OrderListContainer
          {...this.props}
          orders={this.props.readyOrders}
          orderType={"Ready"}
        />
      </Container>
    );
  }
}

const OrderListContainer = (props) => (
  <OrderList>
    <OrderListHeading>
      <h4>{props.orderType} Orders</h4>
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
    <ReadyOrder readyOrder={props.order} />
  );

const mapStateToProps = (state) => ({
  activeOrders: state.orders.activeOrders,
  readyOrders: state.orders.readyOrders,
  user: state.session.profile,
  isLoading: state.orders.isLoading
});

const mapDispatchToProps = {
  getActiveOrders,
  getReadyOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrders);
