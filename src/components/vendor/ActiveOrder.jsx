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
import { completeOrder, refundOrder } from "../../actions/orders";
import { formatPriceFromFloatString } from "../../services/formatting";

import { Button } from "../styles";

const ActiveOrder = (props) => {
  const { customer, orderItems } = props.activeOrder;
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
                        {Array.isArray(mod.selectedOptions)
                          ? mod.selectedOptions.map((a) => a.name).join(", ")
                          : mod.selectedOptions.name}
                      </p>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          );
        })}
      </Row>
      <Row>{props.activeOrder.method}</Row>
      <Row>
        <Col>{formatPriceFromFloatString(props.activeOrder.total)}</Col>
      </Row>
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
    </Col>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  completeOrder,
  refundOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrder);
