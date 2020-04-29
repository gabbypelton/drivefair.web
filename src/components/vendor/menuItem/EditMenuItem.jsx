import React, { Component } from "react";
import { connect } from "react-redux";
import { CardBody, FormGroup, CardImg } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { editMenuItem } from "../../../actions/menu";
import {
  Form,
  Button,
  Col,
  Row,
  Label,
  Input,
  InputErrorMessage,
  TouchableHighlight,
  ModificationSelect,
  ModificationOption,
} from "../../styles";
import { formatImgurUrl } from "../../../services/formatting";
import EditModification from "./EditModification";
import { colors } from "../../../constants/theme";
import { addMenuItem } from "../../../actions/menu";
import { useState } from "react";

export class EditMenuItem extends Component {
  state = {
    name: "",
    imageUrl: "",
    description: "",
    price: "",
    modifications: [{}],
    formErrors: {},
  };

  componentDidMount() {
    const modifications = this.props.modifications;
    if (this.props.menuItem) {
      this.props.menuItem.modifications.forEach((menuItemMod) => {
        modifications.find((a) => (a._id = menuItemMod._id)).selected = true;
      });
    }
    this.setState({
      ...this.props.menuItem,
      modifications,
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  uploadImage() {
    const self = this;
    const req = new XMLHttpRequest();
    const formData = new FormData();
    const element = document.getElementsByClassName("input-image")[0].files[0];
    let imageUrl;

    formData.append("image", element);

    req.open("POST", "https://api.imgur.com/3/image/");
    req.setRequestHeader(
      "Authorization",
      `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT}`
    );
    req.onreadystatechange = function () {
      if (req.status === 200 && req.readyState === 4) {
        let res = JSON.parse(req.responseText);
        imageUrl = `${res.data.id}`;
        self.setState({
          imageUrl,
        });
      }
    };
    req.send(formData);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { imageUrl, name, description, price, modifications } = this.state;
    const selectedModifications = modifications.filter((m) => m.selected);
    if (!this.props.menuItem) {
      this.props.addMenuItem({
        imageUrl,
        name,
        description,
        price,
        modifications: selectedModifications,
      });
    } else {
      this.props.editMenuItem(this.props.menuItem._id, {
        imageUrl,
        name,
        description,
        price,
        modifications: selectedModifications,
      });
    }
  }

  handleModificationChange(modIndex, name, value, e) {
    if (e) e.preventDefault();
    const modifications = [...this.state.modifications];
    const mod = { ...modifications[modIndex] };
    mod[name] = value;
    modifications.splice(modIndex, 1, mod);
    this.setState({ modifications });
  }

  toggleModification(modificationIndex) {
    const { modifications } = this.state;
    modifications[modificationIndex].selected = !modifications[
      modificationIndex
    ].selected;
    this.setState({ modifications });
  }

  render() {
    return (
      <CardBody>
        <Form>
          <Row>
            <FormGroup>
              <Label to="image">Image</Label>
              <CardImg src={formatImgurUrl(this.state.imageUrl)} />
              <Input
                type="file"
                className="input-image"
                onChange={this.uploadImage.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.imageUrl}
              </InputErrorMessage>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Label to="name">Name</Label>
              <Input
                name="name"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.name}
              </InputErrorMessage>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Label to="description">Description</Label>
              <Input
                name="description"
                value={this.state.description}
                onChange={this.handleChange.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.description}
              </InputErrorMessage>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Label to="price">Price</Label>
              <Input
                name="price"
                value={this.state.price}
                onChange={this.handleChange.bind(this)}
              />
              <InputErrorMessage>
                {this.state.formErrors.price}
              </InputErrorMessage>
            </FormGroup>
          </Row>
          <Row>Modifications</Row>
          <Row>(click to select)</Row>
          <Row>
            <ModificationSelect>
              {this.state.modifications.map((existingMod, index) => {
                return (
                  <ModificationOption
                    key={existingMod._id}
                    value={index}
                    selected={existingMod.selected}
                    onClick={() => this.toggleModification(index)}
                  >
                    {existingMod.name}
                  </ModificationOption>
                );
              })}
            </ModificationSelect>
          </Row>
          <Row>
            <EditModification modification={null} />
          </Row>
          <Row>
            <Button onClick={(e) => this.handleSubmit(e)} buttonText="Save" />
          </Row>
        </Form>
      </CardBody>
    );
  }
}

const mapStateToProps = (state) => ({
  modifications: state.menu.modifications,
});

const mapDispatchToProps = {
  editMenuItem,
  addMenuItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMenuItem);
