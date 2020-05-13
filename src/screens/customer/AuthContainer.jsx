import React from "react";
import { connect } from "react-redux";
import { Col, Container, Jumbotron } from "reactstrap";

import { Button, Row } from "../../components/styles";
import Login from "../../components/customer/auth/Login";
import Register from "../../components/customer/auth/Register";
import { colors } from "../../constants/theme";

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedModal: "",
      modalTitle: "",
      cta: "",
    };
  }

  componentDidMount() {
    this.setState({
      selectedModal: "register",
      modalTitle: "Sign up.",
      cta: "Click here if you already have an account.",
    });
  }

  toggleAuthType() {
    let { selectedModal, modalTitle, cta } = this.state;
    if (selectedModal === "register") {
      selectedModal = "login";
      modalTitle = "Sign In.";
      cta = "Click here if you need an account.";
    } else {
      selectedModal = "register";
      modalTitle = "Sign Up.";
      cta = "Click here if you already have an account.";
    }
    this.setState({
      selectedModal,
      modalTitle,
      cta,
    });
  }

  render() {
    return (
      <Container>
        <Jumbotron style={{ backgroundColor: colors.background }}>
          <Row>
            <h1>Denton. Delivered.</h1>
          </Row>
          <Row>
            <Button
              color="link"
              onClick={this.toggleAuthType.bind(this)}
              title={this.state.cta}
            />
          </Row>
        </Jumbotron>
        <Row>
          <Col>
            <Row>
              <ModalSelector selectedModal={this.state.selectedModal} />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const ModalSelector = (props) => {
  return props.selectedModal === "login" ? <Login /> : <Register />;
};

export default connect()(AuthContainer);
