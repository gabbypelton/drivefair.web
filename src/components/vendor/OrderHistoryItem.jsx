import React, { useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Col } from "reactstrap";

import {
  OrderHistoryItemContainer,
  OrderHistoryOrderItem,
  Row,
  Button,
} from "../styles";
import { refundOrder } from "../../actions/orders";
import { formatPriceFromFloatString } from "../../services/formatting";

const OrderHistoryItem = (props) => {
  const [selected, setSelected] = useState(false);
  const {
    customer,
    orderItems,
    createdOn,
    disposition,
    driver,
    actualDeliveryTime,
  } = props.order;
  if (!selected) {
    return (
      <OrderHistoryItemContainer
        index={props.index}
        onClick={() => {
          setSelected(!selected);
        }}
      >
        <Col xs="12">
          <Row>
            <Col>For: {customer.firstName}</Col>
            <Col>
              Placed: {moment(createdOn).format("MM-DD-YYYY @ hh:mm a")}
            </Col>
            <Col>
              {actualDeliveryTime
                ? `Received: ${moment(actualDeliveryTime).format(
                    "MM-DD-YYYY @ hh:mm a"
                  )}`
                : null}
            </Col>
            <Col>{driver ? `Delivered by: ${driver.firstName}` : null}</Col>
          </Row>
        </Col>
      </OrderHistoryItemContainer>
    );
  }
  return (
    <OrderHistoryItemContainer
      index={props.index}
      onClick={() => {
        setSelected(!selected);
      }}
    >
      <Col>
        {orderItems.map((orderItem, index) => (
          <OrderHistoryOrderItem index={index} key={orderItem._id}>
            <Col xs="12" md="6" lg="2">
              <h4>{orderItem.menuItem.name}</h4>
            </Col>
            {[...orderItem.modifications].map((mod) => (
              <Col xs="12" md="6" lg="2">
                <strong>{mod.name}: </strong>
                {Array.isArray(mod.options)
                  ? mod.options.map((a) => a.name).join(", ")
                  : mod.options.name}
              </Col>
            ))}
          </OrderHistoryOrderItem>
        ))}
        <Row>{formatPriceFromFloatString(props.order.total)}</Row>
        <Row>{props.order.method}</Row>
        <Row>
          {disposition !== "CANCELED" ? (
            <Button
              onClick={() => props.refundOrder(props.order._id)}
              title="Refund"
            />
          ) : null}
        </Row>
        <Row>
          <Col>For: {customer.firstName}</Col>
          <Col>Placed: {moment(createdOn).format("MM-DD-YYYY @ hh:mm a")}</Col>
          <Col>
            {actualDeliveryTime
              ? `Received: ${moment(actualDeliveryTime).format(
                  "MM-DD-YYYY @ hh:mm a"
                )}`
              : null}
          </Col>
          <Col>{driver ? `Delivered by: ${driver.firstName}` : null}</Col>
        </Row>
      </Col>
    </OrderHistoryItemContainer>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  refundOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryItem);
