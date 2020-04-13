import React, { Component } from "react";
import { connect } from "react-redux";
import { InputGroup, FormGroup } from "reactstrap";

import {
  Button,
  ModalBody,
  Form,
  Input,
  Label,
  InputErrorMessage
} from "../../styles";
import { loginVendor } from "../../../actions/session";
import { loadState } from "../../../services/stateManagement";
import {
  emailValidation,
  passwordValidation
} from "../../../services/inputValidation";

class Login extends Component {
  state = {
    email: "",
    password: "",
    formErrors: {}
  };

  componentDidMount() {
    const loadableProperties = ["email"];
    loadState(this, loadableProperties);
  }

  handleChange({ target }) {
    const { value, name } = target;
    localStorage.setItem(name, value);
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.loginVendor({ email, password });
  }

  render() {
    return (
      <Form style={{ width: "40%" }}>
        <FormGroup>
          <Label to="email">Email</Label>
          <Input
            name="email"
            value={this.state.email}
            onChange={this.handleChange.bind(this)}
          />
          <InputErrorMessage>{this.state.formErrors.email}</InputErrorMessage>
        </FormGroup>
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
        <Button
          color="tertiary"
          onClick={e => this.handleSubmit(e)}
          buttonText="Sign In"
          isLoading={this.props.isLoading}
        />
      </Form>
    );
  }
}

export default connect(null, { loginVendor })(Login);
