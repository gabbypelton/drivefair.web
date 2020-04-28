import React, { Component } from "react";
import { connect } from "react-redux";
import { CardBody, FormGroup, CardImg } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { editMenuItem } from "../../../actions/menu";
import {
  Form,
  Button,
  Col,
  Row,
  Label,
  Input,
  InputErrorMessage,
} from "../../styles";
import { formatImgurUrl } from "../../../services/formatting";
import EditModification from "./EditModification";
import { colors } from "../../../constants/theme";
import { addMenuItem } from "../../../actions/menu";

export class EditMenuItem extends Component {
  state = {
    name: "",
    imageUrl: "",
    description: "",
    price: "",
    modifications: [],
    formErrors: {},
  };

  componentDidMount() {
    if (this.props.menuItem) {
      this.setState({
        ...this.props.menuItem,
      });
    }
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
    if (!this.props.menuItem) {
      this.props.addMenuItem({
        imageUrl,
        name,
        description,
        price,
        modifications,
      });
    } else {
      this.props.editMenuItem(this.props.menuItem._id, {
        imageUrl,
        name,
        description,
        price,
        modifications,
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

  addModification() {
    const modifications = [
      ...this.state.modifications,
      { name: "", options: [], type: "single" },
    ];

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
          <Row>
            {this.state.modifications.map((mod, modIndex) => (
              <EditModification
                key={modIndex}
                modIndex={modIndex}
                mod={mod}
                handleModificationChange={this.handleModificationChange.bind(
                  this
                )}
              />
            ))}
          </Row>
          <Row>
            <Col>
              <FontAwesomeIcon
                icon={faPlus}
                color={colors.primary}
                onClick={() => this.addModification()}
              />
            </Col>
          </Row>
          <Row>
            <Button onClick={(e) => this.handleSubmit(e)} buttonText="Save" />
          </Row>
        </Form>
      </CardBody>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  editMenuItem,
  addMenuItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMenuItem);
