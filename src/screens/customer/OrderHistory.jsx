import React, { Component } from "react";
import { connect } from "react-redux";

import {
  OrderListHeading,
  OrderListBody,
  OrderList,
} from "../../components/styles";
import { getOrderHistory } from "../../actions/orders";
import Order from "../../components/customer/Order";
import { Spinner } from "reactstrap";

export class OrderHistory extends Component {
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
              <Order
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
  user: state.session.profile,
  isLoading: state.orders.isLoading
});

const mapDispatchToProps = {
  getOrderHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
