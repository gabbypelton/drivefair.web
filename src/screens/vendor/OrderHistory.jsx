import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";

import {
  OrderHistoryList,
  OrderHistoryListBody,
  OrderHistoryListHeading,
} from "../../components/styles";
import { getOrderHistory } from "../../actions/orders";
import OrderHistoryItem from "../../components/vendor/OrderHistoryItem";

export class OrderHistory extends Component {
  componentDidMount() {
    this.props.getOrderHistory();
  }

  render() {
    return (
      <OrderHistoryList>
        <OrderHistoryListHeading>
          <h4>Order History</h4>
        </OrderHistoryListHeading>
        {this.props.isLoading ? (
          <OrderHistoryListBody>
            <Spinner />
          </OrderHistoryListBody>
        ) : this.props.orderHistory.length ? (
          <OrderHistoryListBody>
            {this.props.orderHistory.map((order, index) => (
              <OrderHistoryItem
                index={index}
                key={order._id}
                order={order}
                orderType={this.props.orderType}
              />
            ))}
          </OrderHistoryListBody>
        ) : (
          <OrderHistoryListBody>
            <h5>None yet!</h5>
          </OrderHistoryListBody>
        )}
      </OrderHistoryList>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
