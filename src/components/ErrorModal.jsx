import React from "react";
import { connect, useDispatch } from "react-redux";
import { Modal, ModalBody, Row, Col, Button } from "./styles";

export const ErrorModal = ({ error, errorType }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Modal isOpen={error}>
        <ModalBody>
          <Row>
            <Col> {error ? error.message : null}</Col>
            <Col>
              <Button
                title="Okay"
                onClick={() =>
                  dispatch({
                    type: `DISMISS_${errorType.toUpperCase()}_ERROR`,
                  })
                }
              />
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  const errorType = Object.keys(state).find((reducer) => state[reducer].error);
  return {
    errorType,
    error: errorType ? state[errorType].error : null,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
