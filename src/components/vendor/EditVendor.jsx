import React, { Component } from "react";
import { connect } from "react-redux";
import { FormGroup, Modal, ModalHeader, ModalBody } from "reactstrap";

import {
  Button,
  Form,
  Col,
  Row,
  Input,
  Label,
  InputErrorMessage,
} from "../styles";
import { editVendor } from "../../actions/vendor";
import {
  passwordValidation,
  emailValidation,
  confirmPasswordValidation,
} from "../../services/inputValidation";
import { formatImgurUrl } from "../../services/formatting";

class EditVendor extends Component {
  state = {
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    businessName: "",
    phoneNumber: "",
    street: "",
    unit: "",
    city: "",
    state: "",
    zip: "",
    logoUrl: "",
    formErrors: {},
    showCheckPasswordModal: false,
  };

  componentDidMount() {
    const { email, businessName, phoneNumber, address, logoUrl } = this.props.profile;
    const { street, unit, city, state, zip } = address;

    this.setState({
      email,
      businessName,
      phoneNumber,
      logoUrl,
      street,
      unit,
      city,
      state,
      zip,
    });
  }

  handleChange({ target }) {
    let { name, value } = target;
    if (name === "phoneNumber") {
      if (value.match(/[^0-9\-]{1}/)) return;
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
    const {
      email,
      password,
      newPassword,
      confirmNewPassword,
      logoUrl,
      businessName,
      phoneNumber,
      street,
      unit,
      city,
      state,
      zip,
    } = this.state;

    const address = {
      street,
      unit,
      city,
      state,
      zip,
    };

    const formErrors = {
      email: emailValidation(email),
      newPassword: passwordValidation(newPassword),
      confirmNewPassword: confirmPasswordValidation(
        newPassword,
        confirmNewPassword
      ),
    };

    if (
      formErrors.email ||
      formErrors.newPassword ||
      formErrors.confirmNewPassword
    ) {
      this.setState({ formErrors });
      return;
    }

    this.props.editVendor({
      email,
      password,
      newPassword,
      businessName,
      phoneNumber,
      address,
      logoUrl,
    });
  }

  toggleCheckPasswordModal() {
    const showCheckPasswordModal = !this.state.showCheckPasswordModal;
    this.setState({
      showCheckPasswordModal,
    });
  }

  uploadImage() {
    const self = this;
    const req = new XMLHttpRequest();
    const formData = new FormData();
    const element = document.getElementsByClassName("input-image")[0].files[0];
    let logoUrl;

    formData.append("image", element);

    req.open("POST", "https://api.imgur.com/3/image/");
    req.setRequestHeader(
      "Authorization",
      `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT}`
    );
    req.onreadystatechange = function () {
      if (req.status === 200 && req.readyState === 4) {
        let res = JSON.parse(req.responseText);
        logoUrl = `${res.data.id}`;
        self.setState({
          logoUrl,
        });
      }
    };
    req.send(formData);
  }

  render() {
    return (
      <Col xs="12">
        <Form style={{ width: "100%" }}>
          <Row>
            <Col xs="6" md="4">
              <FormGroup>
                <Label to="logoUrl">Email</Label>
                <img style={{width: "50%"}} src={formatImgurUrl(this.state.logoUrl)} />
                <Input
                  type="file"
                  className="input-image"
                  onChange={this.uploadImage.bind(this)}
                />
                <InputErrorMessage>
                  {this.state.formErrors.logoUrl || " "}
                </InputErrorMessage>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="6" md="4">
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
            <Col xs="6" md="4">
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
            <Col xs="6" md="4">
              <FormGroup>
                <Label to="phoneNumber">Phone Number</Label>
                <Input
                  name="phoneNumber"
                  type="tel"
                  maxLength="12"
                  value={this.state.phoneNumber}
                  onInput={this.handleChange.bind(this)}
                />
                <InputErrorMessage>
                  {this.state.formErrors.phoneNumber}
                </InputErrorMessage>
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs="12">
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
              maxLength="2"
              value={this.state.state}
              placeholder="State"
              inputError={this.state.formErrors.state}
              onChange={this.handleChange.bind(this)}
            />
            <GroupedInput
              name="zip"
              maxLength="5"
              value={this.state.zip}
              placeholder="Zip"
              inputError={this.state.formErrors.zip}
              onChange={this.handleChange.bind(this)}
            />
          </Row>
          <Row>
            <Col xs="12">
              <Label>Change Password</Label>
            </Col>
          </Row>
          <Row>
            <GroupedInput
              name="newPassword"
              type="password"
              value={this.state.newPassword}
              placeholder="New Password"
              inputError={this.state.formErrors.newPassword}
              onChange={this.handleChange.bind(this)}
            />
            <GroupedInput
              name="confirmNewPassword"
              type="password"
              value={this.state.confirmNewPassword}
              placeholder="Confirm New Password"
              inputError={this.state.formErrors.city}
              onChange={this.handleChange.bind(this)}
            />
          </Row>
          <Row style={{ justifyContent: "center" }}>
            <Button
              color="tertiary"
              isLoading={this.props.isLoading}
              onClick={() => this.toggleCheckPasswordModal()}
              buttonText="Save"
            />
          </Row>
        </Form>
        <CheckPasswordModal
          toggle={this.toggleCheckPasswordModal.bind(this)}
          isOpen={this.state.showCheckPasswordModal}
          handleChange={this.handleChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
      </Col>
    );
  }
}

const GroupedInput = (props) => {
  return (
    <Col xs={6} md="">
      <FormGroup>
        <Input {...props} />
        <InputErrorMessage>{props.inputError}</InputErrorMessage>
      </FormGroup>
    </Col>
  );
};

const CheckPasswordModal = (props) => {
  return (
    <Modal isOpen={props.isOpen} toggle={() => props.toggle()}>
      <ModalHeader>Check Password</ModalHeader>
      <ModalBody>
        <Row>
          <Form onSubmit={(e) => props.handleSubmit(e)}>
            <FormGroup>
              <Label to="password">
                Enter your password to confirm changes
              </Label>
              <Input
                name="password"
                type="password"
                onInput={(e) => props.handleChange(e)}
              />
              <Button buttonText="Submit" />
            </FormGroup>
          </Form>
        </Row>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.session.profile,
  };
};

export default connect(mapStateToProps, { editVendor })(EditVendor);
