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
                {Object.keys(orderItem.modifications).map((modName) => {
                  const selectedMod = orderItem.modifications[modName];
                  return (
                    <Col key={modName}>
                      <p>
                        <strong>{modName}:</strong> {selectedMod}
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

const SelectedOptions = (props) => (
  <Col>
    <Row>
      <Col>{props.menuItemMod.displayName}</Col>
    </Row>
    {typeof props.selections === "object" ? (
      <Col>
        {props.selections.map((selection) => {
          return (
            <Row>
              <Col>{selection}</Col>
            </Row>
          );
        })}
      </Col>
    ) : (
      <Row>
        <Col>{props.selections}</Col>
      </Row>
    )}
    <Row></Row>
  </Col>
);

const mapStateToProps = (state) => ({
  selectedVendor: state.vendor.selectedVendor,
  isLoading: state.cart.isLoading,
});

const mapDispatchToProps = {
  completeOrder,
  refundOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrder);
