import React from "react";
import moment from "moment";
import { Row, Col, OrderItemContainer } from "../styles";
import { formatPriceFromFloatString } from "../../services/formatting";

const Order = (props) => {
  const { vendor, orderItems, createdOn } = props.order;
  return (
    <OrderItemContainer xs="12" md="6" lg="4">
      <Row>
        <Col>{vendor.businessName}</Col>
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
      <Row>{props.order.method}</Row>
      <Row>
        <Col>{formatPriceFromFloatString(props.order.total)}</Col>
      </Row>
      <Row>
        <Col>{moment(createdOn).format("MM-DD-YYYY @ hh:mm")}</Col>
      </Row>
    </OrderItemContainer>
  );
};

export default Order;
