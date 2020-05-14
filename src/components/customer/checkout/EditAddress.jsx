import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

import {
  Col,
  Row,
  Label,
  Input,
  ModificationFormGroup,
  ModificationInputGroup,
  TouchableHighlight,
} from "../../styles";
import { colors } from "../../../constants/theme";
import { editAddress, addAddress } from "../../../actions/customer";

const INITAL_STATE = {
  street: "",
  unit: "",
  city: "",
  state: "",
  zip: "",
};

class EditAddress extends Component {
  state = INITAL_STATE;

  componentDidMount() {
    if (this.props.address) {
      this.setState({
        ...this.props.address,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const oldAddress = prevProps.address;
    const newAddress = this.props.address;
    if (newAddress && (!oldAddress || newAddress._id !== oldAddress._id)) {
      this.setState({
        ...this.props.address,
      });
    } else if (!newAddress && oldAddress) {
      this.setState({ ...INITAL_STATE });
    }
  }

  handleModificationChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  saveModification() {
    const existingAddress = this.props.address;
    const { street, unit, city, state, zip } = this.state;
    if (existingAddress) {
      this.props.editAddress(existingAddress._id, {
        street,
        unit,
        city,
        state,
        zip,
      });
    } else this.props.addAddress({ street, unit, city, state, zip });
  }

  render() {
    const { street, unit, city, state, zip } = this.state;
    return (
      <ModificationFormGroup>
        <Row>{this.props.address ? "Edit" : "New"} Address</Row>
        <Row>
          <Col xs="8">
            <ModificationInputGroup>
              <Label to="street" hidden>
                Street
              </Label>
              <Input
                name="street"
                placeholder="Street"
                value={street}
                onChange={(e) =>
                  this.handleModificationChange(e.target.name, e.target.value)
                }
              />
            </ModificationInputGroup>
          </Col>
          <Col xs="4">
            <ModificationInputGroup>
              <Label to="unit" hidden>
                Unit
              </Label>
              <Input
                name="unit"
                placeholder="Unit #"
                value={unit}
                onChange={(e) =>
                  this.handleModificationChange(e.target.name, e.target.value)
                }
              />
            </ModificationInputGroup>
          </Col>
        </Row>
        <Row>
        <Col xs="4">
            <ModificationInputGroup>
              <Label to="city" hidden>
                City
              </Label>
              <Input
                name="city"
                placeholder="City"
                value={city}
                onChange={(e) =>
                  this.handleModificationChange(e.target.name, e.target.value)
                }
              />
            </ModificationInputGroup>
          </Col>
          <Col xs="4">
            <ModificationInputGroup>
              <Label to="state" hidden>
                State
              </Label>
              <Input
                name="state"
                placeholder="State"
                value={state}
                onChange={(e) =>
                  this.handleModificationChange(e.target.name, e.target.value)
                }
              />
            </ModificationInputGroup>
          </Col>
          <Col xs="4">
            <ModificationInputGroup>
              <Label to="zip" hidden>
                Zip
              </Label>
              <Input
                name="zip"
                placeholder="Zip"
                value={zip}
                onChange={(e) =>
                  this.handleModificationChange(e.target.name, e.target.value)
                }
              />
            </ModificationInputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <TouchableHighlight onClick={() => this.saveModification()}>
              <FontAwesomeIcon icon={faSave} color={colors.primary100} /> Save
            </TouchableHighlight>
          </Col>
        </Row>
      </ModificationFormGroup>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  editAddress,
  addAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);
