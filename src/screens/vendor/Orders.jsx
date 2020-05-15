import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";

import {
  OrdersContainer,
  Row,
  OrderList,
  OrderListHeading,
  OrderListBody,
} from "../../components/styles";
import { getActiveOrders, getReadyOrders } from "../../actions/orders";
import { getActiveDrivers } from "../../actions/drivers";
import ActiveOrder from "../../components/vendor/ActiveOrder";
import ReadyOrder from "../../components/vendor/ReadyOrder";

let getRealTimeDataInterval;
export class Orders extends Component {
  componentDidMount() {
    this.getRealTimeData();
    getRealTimeDataInterval = setInterval(() => this.getRealTimeData(), 30000);
  }

  componentWillUnmount() {
    clearInterval(getRealTimeDataInterval);
  }

  getRealTimeData() {
    this.props.getActiveOrders();
    this.props.getReadyOrders();
    this.props.getActiveDrivers();
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
      <h4>{props.orderType} Orders </h4>
      {props.isLoading && props.orders.length ? <Spinner style={{position: "absolute", right: 0}}/> : null}
    </OrderListHeading>
    {props.isLoading && !props.orders.length ? (
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
  isLoading: state.orders.isLoading,
});

const mapDispatchToProps = {
  getActiveOrders,
  getReadyOrders,
  getActiveDrivers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
