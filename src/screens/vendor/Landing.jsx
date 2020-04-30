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
              <Row>
                {props.emailConfirmationSent
                  ? `Go check your inbox at ${props.email}`
                  : "Confirm your email!"}
              </Row>
              <Row>
                {props.emailConfirmationSent ? null : (
                  <Button
                    buttonText="Resend Email"
                    color="primary"
                    onClick={() => props.sendConfirmationEmail("vendor")}
                  />
                )}
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
  email: state.session.profile.email,
  emailIsConfirmed: state.session.profile.emailIsConfirmed,
  emailConfirmationSent: state.session.emailConfirmationSent,
});

const mapDispatchToProps = {
  sendConfirmationEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
