import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { readyOrder, refundOrder } from "../../actions/orders";
import { formatPriceFromFloatString } from "../../services/formatting";

import {
  Row,
  Col,
  Button,
  OrderContainer,
  OrderItemContainer,
} from "../styles";
import AcceptOrderModal from "./AcceptOrderModal";

const ActiveOrder = (props) => {
  const {
    customer,
    orderItems,
    createdOn,
    address,
    method,
    disposition,
  } = props.activeOrder;
  const { street, unit, city, state, zip } = address ? address : {};
  const [showAcceptOrderModal, setShowAcceptOrderModal] = useState(false);
  return (
    <OrderContainer xs="12" md="5" lg="3" disposition={disposition}>
      <Row>
        <Col>{moment(createdOn).format("hh:mm A")}</Col>
      </Row>
      <Row>
        <Col>
          {customer.firstName} {customer.lastName[0]}
        </Col>
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
      <Row>
        <Col>{method}</Col>
      </Row>
      {method === "DELIVERY" ? (
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
      ) : null}
      {disposition === "ACCEPTED" ? (
        <Row>
          <Col>
            <Button
              onClick={() => props.refundOrder(props.activeOrder._id)}
              title="Refund"
            />
            <Button
              onClick={() => props.readyOrder(props.activeOrder._id)}
              title="Ready"
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Button
              onClick={() => setShowAcceptOrderModal(!showAcceptOrderModal)}
              title="Accept"
              isLoading={props.isLoading}
            />
          </Col>
        </Row>
      )}
      <AcceptOrderModal
        isOpen={showAcceptOrderModal}
        toggle={() => setShowAcceptOrderModal(!showAcceptOrderModal)}
        order={props.activeOrder}
      />
    </OrderContainer>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.orders.isLoading,
});

const mapDispatchToProps = {
  readyOrder,
  refundOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrder);
