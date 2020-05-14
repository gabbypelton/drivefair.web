import React, { useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { refundOrder } from "../../actions/orders";
import { formatPriceFromFloatString } from "../../services/formatting";

import {
  Row,
  Col,
  Button,
  OrderHistoryContainer,
  OrderItemContainer,
} from "../styles";
import { colors } from "../../constants/theme";

const OrderHistoryItem = (props) => {
  const [selected, setSelected] = useState(false);
  const { customer, orderItems, createdOn, disposition } = props.order;
  if (!selected) {
    return (
      <OrderHistoryContainer
        xs="12"
        onClick={() => {
          setSelected(!selected);
        }}
      >
        <Row>
          <Col>{moment(createdOn).format("MM-DD-YYYY @ hh:mm a")}</Col>
        </Row>
        <Row>
          <Col>{customer.firstName}</Col>
        </Row>
      </OrderHistoryContainer>
    );
  }
  return (
    <OrderHistoryContainer
      xs="12"
      onClick={() => {
        setSelected(!selected);
      }}
    >
      <Row>
        <Col>{moment(createdOn).format("MM-DD-YYYY @ hh:mm a")}</Col>
      </Row>
      <Row>
        <Col>{customer.firstName}</Col>
      </Row>
      <Row>
        {orderItems.map((orderItem) => {
          return (
            <OrderItemContainer key={orderItem._id} xs="4">
              <Row>
                <Col>
                  <h4>{orderItem.menuItem.name}</h4>
                </Col>
              </Row>
              {orderItem.modifications.map((mod) => {
                return (
                  <Row key={mod._id}>
                    <p>
                      <strong>{mod.name}: </strong>
                      {Array.isArray(mod.options)
                        ? mod.options.map((a) => a.name).join(", ")
                        : mod.options.name}
                    </p>
                  </Row>
                );
              })}
            </OrderItemContainer>
          );
        })}
      </Row>
      <Row>
        <Col>{formatPriceFromFloatString(props.order.total)}</Col>
      </Row>
      <Row>
        <Col>{props.order.method}</Col>
      </Row>
      <Row>
        <Col>
          {disposition !== "CANCELED" ? (
            <Button
              onClick={() => props.refundOrder(props.order._id)}
              title="Refund"
            />
          ) : null}
        </Col>
      </Row>
    </OrderHistoryContainer>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  refundOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryItem);
