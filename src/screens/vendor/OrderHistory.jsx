import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";

import {
  OrderList,
  OrderListBody,
  OrderListHeading,
} from "../../components/styles";
import { getOrderHistory } from "../../actions/orders";
import OrderHistoryItem from "../../components/vendor/OrderHistoryItem";

export class ActiveOrders extends Component {
  componentDidMount() {
    this.props.getOrderHistory();
  }

  render() {
    return (
      <OrderList>
        <OrderListHeading>
          <h4>Order History</h4>
        </OrderListHeading>
        {this.props.isLoading ? (
          <OrderListBody>
            <Spinner />
          </OrderListBody>
        ) : this.props.orderHistory.length ? (
          <OrderListBody>
            {this.props.orderHistory.map((order) => (
              <OrderHistoryItem
                key={order._id}
                order={order}
                orderType={this.props.orderType}
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
  }
}

const mapStateToProps = (state) => ({
  orderHistory: state.orders.orderHistory,
  readyOrders: state.orders.readyOrders,
  user: state.session.profile,
  isLoading: state.orders.isLoading,
});

const mapDispatchToProps = {
  getOrderHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrders);
