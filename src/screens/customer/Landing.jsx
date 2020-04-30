import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import { Button } from "../../components/styles";
import AuthContainer from "../../components/customer/auth/AuthContainer";
import Vendors from "./Vendors";
import { sendConfirmationEmail } from "../../actions/session";

const Landing = (props) => {
  return (
    <div>
      {props.isLoggedIn ? (
        props.emailIsConfirmed ? (
          <Vendors />
        ) : (
          <Row>
            <Col>
              <Row>Confirm your email!</Row>
              <Row>
                <Button
                  buttonText="Resend Email"
                  color="primary"
                  onClick={() => props.sendConfirmationEmail("customers")}
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
  emailIsConfirmed: state.session.profile.emailIsConfirmed,
});

const mapDispatchToProps = {
  sendConfirmationEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
