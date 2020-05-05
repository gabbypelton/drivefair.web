import React, { useState } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import moment from "moment";
import { deliverOrder, refundOrder } from "../../actions/orders";
import { formatPriceFromFloatString } from "../../services/formatting";

import { Button } from "../styles";

const completedOrder = (props) => {
  const { customer, orderItems, createdOn } = props.completedOrder;
  // const { street, unit, city, state, zip } = customer.address;
  return (
    <Col xs="12" md="6" lg="4">
      <Row>
        <Col>{moment(createdOn).format("MM-DD-YYYY @ hh:mm")}</Col>
      </Row>
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
      <Row>{props.completedOrder.method}</Row>
      <Row>
        <Col>{formatPriceFromFloatString(props.completedOrder.total)}</Col>
      </Row>
      <Row>
        <Col>
          <Button
            color="primary"
            onClick={() => props.refundOrder(props.completedOrder._id)}
            buttonText="Refund"
          />
          <Button
            color="primary"
            onClick={() => props.deliverOrder(props.completedOrder._id)}
            buttonText="Deliver"
          />
        </Col>
      </Row>
    </Col>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  deliverOrder,
  refundOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(completedOrder);
