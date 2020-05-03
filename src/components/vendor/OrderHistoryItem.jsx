import React, { useState } from "react";
import { connect } from "react-redux";
import {
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
  CardImg,
  Card,
} from "reactstrap";
import { refundOrder } from "../../actions/orders";
import { formatPriceFromFloatString } from "../../services/formatting";

import { Button } from "../styles";

const OrderHistoryItem = (props) => {
  const { customer, orderItems } = props.order;
  return (
    <Col xs="12" md="6" lg="4">
      <Row>
        <Col>
          {customer.firstName} {customer.lastName}
        </Col>
      </Row>
      <Row>
        {orderItems.map((orderItem) => {
          return (
            <Col key={orderItem._id} xs="12">
              <Row>
                <h4>{orderItem.menuItem.name}</h4>
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
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col>{props.order.method}</Col>
      </Row>
      <Row>
        <Col>{formatPriceFromFloatString(props.order.total)}</Col>
      </Row>
      <Row>
        <Col>
          <Button
            color="primary"
            onClick={() => props.refundOrder(props.order._id)}
            buttonText="Refund"
          />
        </Col>
      </Row>
    </Col>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  refundOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryItem);
