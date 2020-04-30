import React, { Component } from "react";
import { connect } from "react-redux";
import AuthContainer from "../../components/vendor/auth/AuthContainer";
import ActiveOrders from "./ActiveOrders";
import { Row, Col, Button } from "../../components/styles";
import { sendConfirmationEmail } from "../../actions/session";

const Landing = (props) => {
  return (
    <div>
      {props.isLoggedIn ? (
        props.emailIsConfirmed ? (
          <ActiveOrders />
        ) : (
          <Row>
            <Col>
              <Row>Confirm your email!</Row>
              <Row>
                <Button
                  buttonText="Resend Email"
                  color="primary"
                  onClick={() => props.sendConfirmationEmail("vendors")}
                />
              </Row>
            </Col>
          </Row>
        )
      ) : (
        <AuthContainer />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.session.isLoggedIn,
  isLoading: state.session.isLoading,
  emailIsConfirmed: state.session.profile.emailIsConfirmed,
});

const mapDispatchToProps = {
  sendConfirmationEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
