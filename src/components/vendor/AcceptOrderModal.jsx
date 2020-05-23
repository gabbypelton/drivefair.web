import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Spinner,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Row,
  Button,
  ModificationSelect,
  ModificationOption,
} from "../styles";
import { acceptOrder } from "../../actions/orders";

export const DriversModal = (props) => {
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [timeToReady, setTimeToReady] = useState(15);
  useEffect(() => {
    if (props.drivers.length > 0) {
      setSelectedDriverId(props.drivers[0]._id);
    }
  }, [props.drivers]);
  const acceptOrder = () => {
    props.acceptOrder({
      orderId: props.order._id,
      driverId: selectedDriverId,
      timeToReady,
    });
    props.toggle();
  };
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader>
        Accept Order From {props.order.customer.firstName}
      </ModalHeader>
      <ModalBody>
        {props.order.method === "DELIVERY" ? (
          <Container>
            <Row>Drivers</Row>
            <Row>(click to select)</Row>
            <Row>
              <ModificationSelect>
                {props.isLoading ? (
                  <Spinner />
                ) : (
                  props.drivers.map((driver) => {
                    return (
                      <ModificationOption
                        key={driver._id}
                        selected={selectedDriverId === driver._id}
                        onClick={() => setSelectedDriverId(driver._id)}
                      >
                        {driver.lastName}, {driver.firstName}
                      </ModificationOption>
                    );
                  })
                )}
              </ModificationSelect>
            </Row>
          </Container>
        ) : null}
        <Row>
          <Col xs="12" md="8">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Ready in</InputGroupText>
              </InputGroupAddon>
              <Input
                name="timeToReady"
                value={timeToReady}
                onChange={(e) => setTimeToReady(e.target.value)}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>minutes</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Col>
          <Col xs="12" md="4">
            <Button
              width="100%"
              title="Begin Order"
              onClick={() => acceptOrder()}
            />
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.drivers.isLoading,
  drivers: state.drivers.activeDrivers,
});

const mapDispatchToProps = {
  acceptOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(DriversModal);
