import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  readyOrder,
  refundOrder,
  requestDriver,
  autoSelect,
  acceptOrder,
} from "../../actions/orders";
import { formatPriceFromFloatString } from "../../services/formatting";

import {
  Row,
  Col,
  Button,
  OrderContainer,
  OrderItemContainer,
} from "../styles";
import AcceptOrderModal from "./AcceptOrderModal";
import SelectDriverModal from "./SelectDriverModal";
import { Container } from "reactstrap";

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
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const showModal = (modal) => {
    setModalType(modal);
    setIsShowingModal(true);
  };
  return (
    <OrderContainer xs="12" md="5" lg="3" disposition={disposition}>
      <Row>
        <Col>{moment(createdOn).format("hh:mm A")}</Col>
      </Row>
      <Row>
        <Col>
          {customer.firstName} {customer.lastName ? customer.lastName[0] : null}
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
        <Container>
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
          <DeliveryButtons {...props} showModal={showModal} />
        </Container>
      ) : (
        <PickupButtons {...props} showModal={showModal} />
      )}
      <AcceptOrderModal
        isOpen={isShowingModal && modalType === "acceptOrder"}
        toggle={() => setIsShowingModal(!isShowingModal)}
        order={props.activeOrder}
      />
      <SelectDriverModal
        isOpen={isShowingModal && modalType === "requestDriver"}
        toggle={() => setIsShowingModal(!isShowingModal)}
        order={props.activeOrder}
      />
    </OrderContainer>
  );
};

const DeliveryButtons = (props) => {
  switch (props.activeOrder.disposition) {
    case "ACCEPTED_BY_VENDOR":
      return (
        <Row>
          <Col>
            <Button
              onClick={() => props.showModal("requestDriver")}
              title="Choose Driver"
            />
            <Button
              onClick={() => props.autoSelect(props.activeOrder._id)}
              title="Auto-select"
            />
          </Col>
        </Row>
      );
    case "ACCEPTED_BY_DRIVER":
      return (
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
      return;
  }
};

const PickupButtons = (props) => {
  switch (props.activeOrder.disposition) {
    case "ACCEPTED_BY_VENDOR":
      return (
        <Row>
          <Col>
            <Button
              onClick={() => props.readyOrder(props.activeOrder._id)}
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
      return;
  }
};

const mapStateToProps = (state) => ({
  isLoading: state.orders.isLoading,
});

const mapDispatchToProps = {
  readyOrder,
  refundOrder,
  requestDriver,
  autoSelect,
  acceptOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrder);
