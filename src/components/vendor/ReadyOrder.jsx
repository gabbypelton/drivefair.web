import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { deliverOrder, refundOrder } from "../../actions/orders";
import { formatPriceFromFloatString } from "../../services/formatting";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Button,
  OrderContainer,
  OrderItemContainer,
} from "../styles";

const ReadyOrder = (props) => {
  const {
    customer,
    orderItems,
    createdOn,
    address,
    disposition,
    stale,
  } = props.readyOrder;
  const { street, unit, city, state, zip } = address[0] ? address[0] : {};
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const refundOrder = (e) => {
    e.preventDefault();
    props.refundOrder({ orderId: props.readyOrder._id, password });
  };

  return (
    <OrderContainer
      xs="12"
      md="5"
      lg="3"
      disposition={disposition}
      stale={true}
    >
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
        <Col>{formatPriceFromFloatString(props.readyOrder.total)}</Col>
      </Row>
      {props.readyOrder.method === "DELIVERY" ? (
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
      <Row>
        <Col>{props.readyOrder.method}</Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => setShowPasswordModal(true)} title="Refund" />
          {props.readyOrder.method === "PICKUP" ? (
            <Button
              onClick={() => props.deliverOrder(props.readyOrder._id)}
              title="Sold"
            />
          ) : null}
        </Col>
      </Row>
      <CheckPasswordModal
        isOpen={showPasswordModal}
        toggle={() => setShowPasswordModal(!showPasswordModal)}
        handleSubmit={refundOrder.bind(this)}
        handleChange={setPassword}
        value={password}
      />
    </OrderContainer>
  );
};

const CheckPasswordModal = (props) => {
  return (
    <Modal isOpen={props.isOpen} toggle={() => props.toggle()}>
      <ModalHeader>Check Password</ModalHeader>
      <ModalBody>
        <Row>
          <Form onSubmit={(e) => props.handleSubmit(e)}>
            <FormGroup>
              <Label to="password">
                Enter your password to confirm changes
              </Label>
              <Input
                name="password"
                type="password"
                value={props.password}
                onInput={(e) => props.handleChange(e.target.value)}
              />
              <Button title="Submit" />
            </FormGroup>
          </Form>
        </Row>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  deliverOrder,
  refundOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadyOrder);
