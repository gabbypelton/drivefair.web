import React from "react";
import { connect } from "react-redux";
import { Col, Container, Jumbotron } from "reactstrap";

import { Button, Modal, ModalHeader, ModalFooter } from "../../styles";
import Login from "./Login";
import Register from "./Register";
import { Row } from "../../styles";

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedModal: "",
      modalTitle: "",
      cta: "",
      nestedModal: false
    };

    this.toggleNested = this.toggleNested.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedModal: "register",
      modalTitle: "Sign up.",
      cta: "Click here if you already have an account."
    });
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal
    });
  }

  toggleSelectedModal() {
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
      cta
    });
  }

  render() {
    return (
      <Container>
        <Jumbotron style={{ backgroundColor: "#F7F9FB" }}>
          <h1 className="display-3">Welcome, Vendor!</h1>
          <p className="lead">Let's get you some orders.</p>
          <p className="lead"></p>
        </Jumbotron>
        <Row>
          <Col>
            <Row>
              <h1>{this.state.modalTitle}</h1>
            </Row>
            <Row>
              <Button
                color="link"
                onClick={this.toggleSelectedModal.bind(this)}
                buttonText={this.state.cta}
              />
            </Row>
            <Row>
              <ModalSelector selectedModal={this.state.selectedModal} />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const ModalSelector = props => {
  return props.selectedModal === "login" ? <Login /> : <Register />;
};

export default connect()(AuthContainer);
