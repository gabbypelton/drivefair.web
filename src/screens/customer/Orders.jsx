import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";

import {
  OrderListHeading,
  OrderListBody,
  OrderList,
  OrdersContainer,
} from "../../components/styles";
import { getActiveOrders, getReadyOrders } from "../../actions/orders";
import Order from "../../components/customer/Order";

export class Orders extends Component {
  componentDidMount() {
    this.props.getActiveOrders();
    this.props.getReadyOrders();
  }

  render() {
    return (
      <OrdersContainer>
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
      </OrdersContainer>
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
          <Order key={order._id} order={order} orderType={props.orderType} />
        ))}
      </OrderListBody>
    ) : (
      <OrderListBody>
        <h5>None yet!</h5>
      </OrderListBody>
    )}
  </OrderList>
);

const mapStateToProps = (state) => ({
  activeOrders: state.orders.activeOrders,
  readyOrders: state.orders.readyOrders,
  user: state.session.profile,
  isLoading: state.orders.isLoading,
});

const mapDispatchToProps = {
  getActiveOrders,
  getReadyOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
