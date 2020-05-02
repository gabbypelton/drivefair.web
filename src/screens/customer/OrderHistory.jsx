import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Container,
  OrderListHeading,
  OrderListBody,
  OrderList,
} from "../../components/styles";
import { getOrderHistory } from "../../actions/orders";
import Order from "../../components/customer/Order";
import { Spinner } from "reactstrap";

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
      {this.props.orderHistory.length ? (
        <OrderListBody>
          {this.props.isLoading ? (
            <Spinner />
          ) : (
            this.props.orderHistory.map((order) => {
              return <Order key={order._id} order={order} />;
            })
          )}
        </OrderListBody>
      ) : (
        <OrderListBody>
          <h5>Looks like we haven't helped you yet!</h5>
        </OrderListBody>
      )}
    </OrderList>
    );
  }
}

const mapStateToProps = (state) => ({
  orderHistory: state.orders.orderHistory,
  user: state.session.profile,
});

const mapDispatchToProps = {
  getOrderHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrders);
