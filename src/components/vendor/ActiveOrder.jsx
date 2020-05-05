import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { completeOrder, refundOrder } from "../../actions/orders";
import { formatPriceFromFloatString } from "../../services/formatting";

import {
  Row,
  Col,
  Button,
  OrderContainer,
  OrderItemContainer,
} from "../styles";

const ActiveOrder = (props) => {
  const { customer, orderItems, createdOn, address } = props.activeOrder;
  const { street, unit, city, state, zip } = address[0] ? address[0] : {};
  return (
    <OrderContainer xs="12" md="6" lg="4">
      <Row>
        <Col>{moment(createdOn).format("MM-DD-YYYY @ hh:mm")}</Col>
      </Row>
      <Row>
        <Col>{customer.firstName}</Col>
      </Row>
      <Row>
        {orderItems.map((orderItem) => {
          return (
            <OrderItemContainer key={orderItem._id} xs="12">
              <Row>
                <Col>
                  <h4>{orderItem.menuItem.name}</h4>
                </Col>
              </Row>
              <Row>
                {orderItem.modifications.map((mod) => {
                  return (
                    <Col key={mod._id}>
                      <p>
                        <strong>{mod.name}: </strong>
                        {Array.isArray(mod.options)
                          ? mod.options.map((a) => a.name).join(", ")
                          : mod.options.name}
                      </p>
                    </Col>
                  );
                })}
              </Row>
            </OrderItemContainer>
          );
        })}
      </Row>
      <Row>
        <Col>{formatPriceFromFloatString(props.activeOrder.total)}</Col>
      </Row>
      {props.activeOrder.method === "DELIVERY" ? (
        <Row>
          <Col>
            <Row>
              <Col>
                {street} {unit ? "#" + unit : null}
              </Col>
            </Row>
            <Row>
              <Col>
                {city}, {state} {zip}
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>{props.activeOrder.method}</Col>
        </Row>
      )}
      <Row>
        <Col>
          <Button
            color="primary"
            onClick={() => props.refundOrder(props.activeOrder._id)}
            buttonText="Refund"
          />
          <Button
            color="primary"
            onClick={() => props.completeOrder(props.activeOrder._id)}
            buttonText="Complete"
          />
        </Col>
      </Row>
    </OrderContainer>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  completeOrder,
  refundOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrder);
