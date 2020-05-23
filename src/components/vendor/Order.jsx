import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  readyOrder,
  refundOrder,
  requestDrivers,
  autoSelect,
  acceptOrder,
} from "../../actions/orders";

import {
  Row,
  Col,
  Button,
  OrderContainer,
  OrderItemList,
  OrderItemContainer,
} from "../styles";
import AcceptOrderModal from "./AcceptOrderModal";
import SelectDriverModal from "./SelectDriverModal";
import { Container } from "reactstrap";
import {
  dispositionVerbiage,
  dispositionPipeline,
} from "../../constants/settings";
import CheckPasswordModal from "../CheckPasswordModal";

const Order = (props) => {
  const {
    customer,
    orderItems,
    createdOn,
    address,
    method,
    disposition,
    estimatedReadyTime,
    estimatedDeliveryTime,
  } = props.order;
  const { street, unit, city, state, zip } = address ? address : {};
  const [password, setPassword] = useState("");
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const showModal = (modal) => {
    setModalType(modal);
    setIsShowingModal(true);
  };
  const orderIsPastDue =
    moment(estimatedReadyTime).isBefore(moment()) &&
    dispositionPipeline[disposition] < 4;
  const deliveryIsPastDue =
    moment(estimatedDeliveryTime).isBefore(moment()) &&
    dispositionPipeline[disposition] < 7;
  const refundOrder = (e) => {
    e.preventDefault();
    props.refundOrder({ orderId: props.order._id, password });
  };
  return (
    <OrderContainer
      xs="12"
      md="5"
      lg="3"
      disposition={disposition}
      stale={orderIsPastDue || deliveryIsPastDue}
    >
      <Row>
        <Col>
          <h3>
            {customer.firstName}{" "}
            {customer.lastName ? customer.lastName[0] : null} -{" "}
            {moment(createdOn).format("hh:mma")}
          </h3>
        </Col>
      </Row>
      <Row>
        <OrderItemList disposition={disposition}>
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
        </OrderItemList>
      </Row>
      <Row>
        <Col>
          {method} - {dispositionVerbiage[props.order.disposition]}
        </Col>
      </Row>
      {method === "DELIVERY" ? (
        <Container>
          <Row>
            <Col>
              <Row>
                <Col>
                  {street} {unit ? "#" + unit : null} {city}, {state} {zip}
                </Col>
              </Row>
            </Col>
          </Row>
          <DeliveryButtons {...props} showModal={showModal} />
        </Container>
      ) : (
        <PickupButtons {...props} showModal={showModal} />
      )}
      <AcceptOrderModal
        isOpen={isShowingModal && modalType === "acceptOrder"}
        toggle={() => setIsShowingModal(!isShowingModal)}
        order={props.order}
      />
      <SelectDriverModal
        isOpen={isShowingModal && modalType === "requestDriver"}
        toggle={() => setIsShowingModal(!isShowingModal)}
        order={props.order}
      />
      <CheckPasswordModal
        isOpen={isShowingModal && modalType === "REFUND"}
        toggle={() => setIsShowingModal(!isShowingModal)}
        handleSubmit={refundOrder.bind(this)}
        handleChange={setPassword}
        value={password}
      />
    </OrderContainer>
  );
};

const DeliveryButtons = (props) => {
  const {
    showModal,
    order,
    readyOrder,
    customerPickUpOrder,
    isLoading,
  } = props;
  switch (order.disposition) {
    case "ACCEPTED_BY_VENDOR":
      return (
        <Row>
          <Col>
            <Button
              onClick={() => showModal("requestDriver")}
              title="Choose Driver"
            />
            <Button onClick={() => autoSelect(order._id)} title="Auto-select" />
          </Col>
        </Row>
      );
    case "ACCEPTED_BY_DRIVER":
      return (
        <Row>
          <Col>
            <Button onClick={() => showModal("REFUND")} title="Refund" />
            <Button onClick={() => readyOrder(order._id)} title="Ready" />
          </Col>
        </Row>
      );
    case "PAID":
      return (
        <Row>
          <Col>
            <Button
              onClick={() => showModal("acceptOrder")}
              title="Accept"
              isLoading={isLoading}
            />
          </Col>
        </Row>
      );
    case "READY":
      return (
        <Row>
          <Button onClick={() => showModal("REFUND")} title="Refund" />
          {readyOrder.method === "PICKUP" ? (
            <Button
              onClick={() => customerPickUpOrder(readyOrder._id)}
              title="Sold"
            />
          ) : null}
        </Row>
      );
    default:
      return <div></div>;
  }
};

const PickupButtons = (props) => {
  switch (props.order.disposition) {
    case "ACCEPTED_BY_VENDOR":
      return (
        <Row>
          <Col>
            <Button
              onClick={() => props.readyOrder(props.order._id)}
              title="Ready"
            />
          </Col>
        </Row>
      );
    case "PAID":
      return (
        <Row>
          <Col>
            <Button
              onClick={() => props.showModal("acceptOrder")}
              title="Accept"
              isLoading={props.isLoading}
            />
          </Col>
        </Row>
      );
    default:
      return <div></div>;
  }
};

const mapStateToProps = (state) => ({
  isLoading: state.orders.isLoading,
});

const mapDispatchToProps = {
  readyOrder,
  refundOrder,
  requestDrivers,
  autoSelect,
  acceptOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
