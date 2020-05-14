import React from "react";
import { connect } from "react-redux";

import { Row, Col, Button } from "../components/styles";
import { sendConfirmationEmail } from "../actions/session";

export const ConfirmEmail = (props) => {
  return (
    <Row>
      <Col>
        <Row>Confirm your email!</Row>
        <Row>
          <Button
            title="Resend Email"
            
            onClick={() => props.sendConfirmationEmail(props.userType)}
          />
        </Row>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  userType: state.session.userType,
});

const mapDispatchToProps = {
  sendConfirmationEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);
