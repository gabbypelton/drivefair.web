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
                {orderItem.modifications.map((orderItemMod) => {
                  const menuItemMod = orderItem.menuItem.modifications.find(
                    (a) => a.name === orderItemMod.name
                  );
                  return (
                    <Col key={orderItemMod._id}>
                      <p>
                        <strong>{menuItemMod.name}: </strong>
                        {Array.isArray(orderItemMod.selectedOptions)
                          ? orderItemMod.selectedOptions.map(a => a.name).join(", ")
                          : orderItemMod.selectedOptions.name}
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
            onClick={() => props.refundOrder()}
            buttonText="Cancel"
          />
          <Button
            color="primary"
            onClick={() => props.completeOrder()}
            buttonText="Complete"
          />
        </Col>
      </Row>
    </Col>
  );
};

const mapStateToProps = (state) => ({
  selectedVendor: state.vendor.selectedVendor,
  isLoading: state.cart.isLoading,
});

const mapDispatchToProps = {
  completeOrder,
  refundOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrder);
