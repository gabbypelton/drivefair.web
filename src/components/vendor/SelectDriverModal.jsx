import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
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
import { requestDriver } from "../../actions/orders";

export const DriversModal = (props) => {
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  useEffect(() => {
    if (props.drivers.length > 0) {
      setSelectedDriverId(props.drivers[0]._id);
    }
  }, [props.drivers]);
  const requestDriver = () => {
    props.requestDriver({
      orderId: props.order._id,
      selectedDriverId,
    });
    props.toggle();
  };
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader>
        Select a new driver for {props.order.customer.firstName}
      </ModalHeader>
      <ModalBody>
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
        <Row>
          <Col xs="12" md="4">
            <Button
              width="100%"
              title="Submit"
              onClick={() => requestDriver()}
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
  requestDriver,
};

export default connect(mapStateToProps, mapDispatchToProps)(DriversModal);
