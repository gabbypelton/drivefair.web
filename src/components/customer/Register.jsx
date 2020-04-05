import React, { Component } from "react";
import { connect } from "react-redux";
import { FormGroup, Col, Row } from "reactstrap";

import { Button, Form, Input, ModalBody, Label, InputErrorMessage } from "../styles";
import { newCustomer } from "../../actions/customer";
import { loadState } from "../../services/stateManagement";
import {
  passwordValidation,
  emailValidation,
  confirmPasswordValidation
} from "../../services/inputValidation";

class Register extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    address: "",
    formErrors: {},
  };

  componentDidMount() {
    const loadableProperties = ['email', 'firstName', 'lastName', 'address'];
    loadState(this, loadableProperties);
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
    const { email, password, firstName, lastName, address } = this.state;

    const formErrors = {
      password: passwordValidation(password),
      email: emailValidation(email),
      confirmPassword: confirmPasswordValidation(confirmPasswordValidation)
    };

    if (formErrors.email || formErrors.password) {
      this.setState({ formErrors });
      return;
    }

    this.props.newCustomer({
      email,
      password,
      firstName,
      lastName,
      address
    }); 
  }

  render() {
    return (
      <Form style={{width: "80%"}}>
        <Row>
          <Col>
            <FormGroup>
              <Label to="email">Email</Label>
              <Input name="email" value={this.state.email} onChange={this.handleChange.bind(this)} />
              <InputErrorMessage>{this.state.formErrors.email || " "}</InputErrorMessage>
            </FormGroup>
            <FormGroup>
              <Label to="password">Password</Label>
              <Input name="password" type="password" value={this.state.password} onChange={this.handleChange.bind(this)} />
              <InputErrorMessage>{this.state.formErrors.password}</InputErrorMessage>
            </FormGroup>
            <FormGroup>
              <Label to="confirmPassword">Conrfirm Password</Label>
              <Input
                name="confirmPassword"
                type="password"
                onChange={this.handleChange.bind(this)}
              />
              <InputErrorMessage>{this.state.formErrors.confirmPassword}</InputErrorMessage>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label to="firstName">First Name</Label>
              <Input name="firstName" value={this.state.firstName} onChange={this.handleChange.bind(this)} />
              <InputErrorMessage>{this.state.formErrors.firstName}</InputErrorMessage>
            </FormGroup>
            <FormGroup>
              <Label to="lastName">Last Name</Label>
              <Input name="lastName" value={this.state.lastName} onChange={this.handleChange.bind(this)} />
              <InputErrorMessage>{this.state.formErrors.lastName}</InputErrorMessage>
            </FormGroup>
            <FormGroup>
              <Label to="address">Delivery Address</Label>
              <Input name="address" value={this.state.address} onChange={this.handleChange.bind(this)} />
              <InputErrorMessage>{this.state.formErrors.address}</InputErrorMessage>
            </FormGroup>
          </Col>
        </Row>
        <Row style={{justifyContent: "center"}}>
          <Button onClick={(e) => this.handleSubmit(e)}>Sign In</Button>
        </Row>
      </Form>
    );
  }
}

export default connect(null, { newCustomer })(Register);
