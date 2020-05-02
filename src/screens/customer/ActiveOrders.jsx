import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Container,
  OrderListHeading,
  OrderListBody,
  OrderList,
} from "../../components/styles";
import { getActiveOrders, getCompletedOrders } from "../../actions/orders";
import Order from "../../components/customer/Order";
import { Spinner } from "reactstrap";

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
      <h4>{props.orderType} Orders</h4>
    </OrderListHeading>
    {props.orders.length ? (
      <OrderListBody>
        {props.isLoading ? (
          <Spinner />
        ) : (
          props.orders.map((order) => {
            return <Order key={order._id} order={order} />;
          })
        )}
      </OrderListBody>
    ) : (
      <OrderListBody>
        <h5>No {props.orderType} Orders!</h5>
      </OrderListBody>
    )}
  </OrderList>
);

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
