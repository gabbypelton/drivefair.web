import React, { Component } from "react";
import { connect } from "react-redux";
import { CardBody, FormGroup, CardImg } from "reactstrap";
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

export class EditMenuItem extends Component {
  state = {
    name: "",
    imageUrl: "",
    formErrors: {},
  };

  componentDidMount() {
    this.setState({
      ...this.props.menuItem,
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

  handleSubmit() {
    const { imageUrl, name, description, price } = this.state;
    this.props.editMenuItem(this.props.menuItem._id, {
      imageUrl,
      name,
      description,
      price,
    });
  }

  render() {
    return (
      <CardBody>
        <Row>
          <Form>
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
          </Form>
        </Row>
        <Row>
          <Form>
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
          </Form>
        </Row>
        <Row>
          <Form>
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
          </Form>
        </Row>
        <Row>
          <Form>
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
            <Button onClick={() => this.handleSubmit()} buttonText="Save" />
          </Form>
        </Row>
      </CardBody>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  editMenuItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMenuItem);
