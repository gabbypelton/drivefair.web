import React, { Component } from "react";
import { connect } from "react-redux";
import { FormGroup, Col, Row } from "reactstrap";

import {
  Button,
  Form,
  Input,
  ModalBody,
  Label,
  InputErrorMessage,
} from "../styles";
import { newVendor } from "../../actions/vendor";
import {
  passwordValidation,
  emailValidation,
  confirmPasswordValidation,
} from "../../services/inputValidation";

class Register extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    formErrors: {},
  };

  componentDidMount() {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    this.setState({
      email,
      password,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    localStorage.setItem(name, value);

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;

    const formErrors = {
      password: passwordValidation(password),
      email: emailValidation(email),
      confirmPassword: confirmPasswordValidation(confirmPasswordValidation),
    };

    if (formErrors.email || formErrors.password) {
      this.setState({ formErrors });
      return;
    }

    this.props.newVendor({
      email,
      password,
    });
  }

  render() {
    return (
      <Form style={{border: "red solid 2px"}}>
        <Row>
          <Col>
            <FormGroup>
              <Label to="email">Email</Label>
              <Input
                name="email"
                value={this.state.email}
                onChange={this.handleChange.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.email}
              </InputErrorMessage>
            </FormGroup>
            <FormGroup>
              <Label to="password">Password</Label>
              <Input
                name="password"
                value={this.state.password}
                onChange={this.handleChange.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.password}
              </InputErrorMessage>
            </FormGroup>
            <FormGroup>
              <Label to="confirmPassword">Conrfirm Password</Label>
              <Input
                name="confirmPassword"
                onChange={this.handleChange.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.confirmPassword}
              </InputErrorMessage>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label to="firstName">First Name</Label>
              <Input name="firstName" onChange={this.handleChange.bind(this)} />
              <InputErrorMessage>
                {this.state.formErrors.firstName}
              </InputErrorMessage>
            </FormGroup>
            <FormGroup>
              <Label to="lastName">Last Name</Label>
              <Input name="lastName" onChange={this.handleChange.bind(this)} />
              <InputErrorMessage>
                {this.state.formErrors.lastName}
              </InputErrorMessage>
            </FormGroup>
            <FormGroup>
              <Label to="address">Delivery Address</Label>
              <Input name="address" onChange={this.handleChange.bind(this)} />
              <InputErrorMessage>
                {this.state.formErrors.address}
              </InputErrorMessage>
            </FormGroup>
          </Col>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Button onClick={(e) => this.handleSubmit(e)}>Sign In</Button>
        </Row>
      </Form>
    );
  }
}

export default connect(null, { newVendor })(Register);
