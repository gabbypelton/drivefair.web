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
import { loadState } from "../../services/stateManagement";
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
    businessName: "",
    phoneNumber: "",
    street: "",
    unit: "",
    city: "",
    state: "",
    zip: "",
    formErrors: {},
  };

  componentDidMount() {
    const loadableProperties = [
      "email",
      "businessName",
      "phoneNumber",
      "street",
      "unit",
      "city",
      "state",
      "zip",
    ];
    loadState(this, loadableProperties);
  }

  handleChange({ target }) {
    let { name, value } = target;
    if (name === "phoneNumber") {
      if (value.match(/[^0-9\-]{1}/)) return
      if (value.match(/^[0-9]{3}$/) || value.match(/^[0-9]{3}-[0-9]{3}$/)) {
        value += "-";
      }
    }

    localStorage.setItem(name, value);

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password, businessName, phoneNumber, address } = this.state;

    const formErrors = {
      email: emailValidation(email),
      password: passwordValidation(password),
      confirmPassword: confirmPasswordValidation(confirmPasswordValidation),
    };

    if (formErrors.email || formErrors.password) {
      this.setState({ formErrors });
      return;
    }

    this.props.newVendor({
      email,
      password,
      businessName,
      phoneNumber,
      address,
    });
  }

  render() {
    return (
      <Form style={{ width: "80%" }}>
        <Row>
          <Col xs="12" md="6" xl="4">
            <FormGroup>
              <Label to="email">Email</Label>
              <Input
                name="email"
                value={this.state.email}
                onChange={this.handleChange.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.email || " "}
              </InputErrorMessage>
            </FormGroup>
          </Col>
          <Col xs="12" md="6" xl="4">
            <FormGroup>
              <Label to="businessName">Business Name</Label>
              <Input
                name="businessName"
                value={this.state.businessName}
                onChange={this.handleChange.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.businessName}
              </InputErrorMessage>
            </FormGroup>
          </Col>
          <Col xs="12" md="6" xl="4">
            <FormGroup>
              <Label to="password">Password</Label>
              <Input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.password}
              </InputErrorMessage>
            </FormGroup>
          </Col>
          <Col xs="12" md="6" xl="4">
            <FormGroup>
              <Label to="confirmPassword">Conrfirm Password</Label>
              <Input
                name="confirmPassword"
                type="password"
                onChange={this.handleChange.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.confirmPassword}
              </InputErrorMessage>
            </FormGroup>
          </Col>
          <Col xs="12" md="6" xl="4">
            <FormGroup>
              <Label to="phoneNumber">Phone Number</Label>
              <Input
                name="phoneNumber"
                type="tel"
                maxlength="12"
                value={this.state.phoneNumber}
                onInput={this.handleChange.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.phoneNumber}
              </InputErrorMessage>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6" xl="4">
            <Label>Business Address</Label>
          </Col>
        </Row>
        <Row>
          <GroupedInput
            name="street"
            value={this.state.street}
            placeholder="Street and Number"
            inputError={this.state.formErrors.street}
            onChange={this.handleChange.bind(this)}
          />
          <GroupedInput
            name="unit"
            value={this.state.unit}
            placeholder="Apt/Unit"
            inputError={this.state.formErrors.unit}
            onChange={this.handleChange.bind(this)}
          />
          <GroupedInput
            name="city"
            value={this.state.city}
            placeholder="City"
            inputError={this.state.formErrors.city}
            onChange={this.handleChange.bind(this)}
          />
          <GroupedInput
            name="state"
            maxlength="2"
            value={this.state.state}
            placeholder="State"
            inputError={this.state.formErrors.state}
            onChange={this.handleChange.bind(this)}
          />
          <GroupedInput
            name="zip"
            maxlength="5"
            value={this.state.zip}
            placeholder="Zip"
            inputError={this.state.formErrors.zip}
            onChange={this.handleChange.bind(this)}
          />
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Button color="tertiary" onClick={(e) => this.handleSubmit(e)}>
            Sign Up
          </Button>
        </Row>
      </Form>
    );
  }
}

const GroupedInput = (props) => {
  return (
    <Col xs="12" md="6" xl="4">
      <FormGroup>
        <Input {...props} />
        <InputErrorMessage>{props.inputError}</InputErrorMessage>
      </FormGroup>
    </Col>
  );
};

export default connect(null, { newVendor })(Register);
