import React from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Label, Input } from "reactstrap";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Button,
  OrderContainer,
  OrderItemContainer,
} from "./styles";

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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CheckPasswordModal);
